var APIKey = "166a433c57516f51dfab1f7edaed8413";
let currentDate = moment().format("dddd, MMMM Do YYYY");
let historyEl = $("#history");
let todayEl = $("#today");
let forecastEl = $("#forecast");

let cityList = JSON.parse(localStorage.getItem("history")) || [];
console.log(cityList);
cityList.forEach(renderCityButtons);

$("#search-button").on("click", function (event) {
  event.preventDefault();
  currentWeather();
});

function currentWeather() {
  let searchInput = $("#search-input").val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput +"&cnt=5&unit=metric&appid=" + APIKey +"&units=metric";

  cityList.unshift(searchInput);
  localStorage.setItem("history", JSON.stringify(cityList));

  console.log(cityList);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    let iconCode = response.weather[0].icon;
    todayEl.empty();
    todayEl.prepend([$("<div>").attr("class", "row").append([
          $("<div>").attr("class", "col").append([
              $("<div>").attr("class", "card rounded border border-secondary mb-2").append([
                  $("<div>").attr("class", "card-body").append([
                      $("<h2>").attr("class", "card-title font-weight-bold").text(response.name + " on " + currentDate).append(
                        $("<img>").attr("src","https://openweathermap.org/img/wn/" +iconCode +"@2x.png")),
                      $("<h5>").attr("class", "card-text").text("temperature:  " + response.main.temp + " C°"),
                      $("<h5>").attr("class", "card-text").text("wind speed:  " + response.wind.speed + " Km/h"),
                      $("<h5>").attr("class", "card-text").text("humidity:  " + response.main.humidity + " %"),
                    ]),
                ]),
            ]),
        ]),
    ]);
    renderCityButtons(searchInput);
    weatherForecast();
  });
}

function renderCityButtons() {
  historyEl.empty();
  cityList.forEach(function (searchInput) {
    if (searchInput){
        $("#history").append(
            $("<button>").addClass("btn btn-secondary mb-2").attr("data-city", searchInput).text(searchInput)
          );
    }
  });
}


function weatherForecast() {
  let searchInput = $("#search-input").val().trim();
  var apiKey = "166a433c57516f51dfab1f7edaed8413";
  var forecast ="https://api.openweathermap.org/data/2.5/forecast?q=" +searchInput +"&units=metric&appid=" + apiKey;
  $.ajax({url: forecast, method: "GET"}).then(function(response) {        
  forecastEl.empty();
    for (let i = 8; i < response.list.length; i++) {
        if (i % 8 === 0 || i === response.list.length - 1) {
            forecastEl.append(($('<div>').addClass('card forecastCard')).append(
              $('<h4>').addClass(`forecastDate').text('${moment(response.list[i].dt_txt).format('dddd')}`), 
              $('<img>').addClass('icon').attr('src', 'https://openweathermap.org/img/wn/' + response.list[i].weather[0].icon + '@2x.png').attr('alt', response.list[i].weather[0].description), 
              $('<h5>').addClass('forecastTemp').text('Temp: ' + response.list[i].main.temp +' °C'), 
              $('<h5>').addClass('forecastWind').text('Wind : ' + response.list[i].wind.speed + ' km/h'), 
              $('<h5>').addClass('forecastHumidity').text('Humidity: ' + response.list[i].main.humidity + ' %')
              ));
        }
    };
});
}


historyEl.on('click', '.btn-secondary', function (event) {
    event.preventDefault();
    let entry = event.target;
    console.log(entry);
    let city = entry.getAttribute('response-city');
    
    console.log(city);
    currentWeather(city);
})