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
  weatherForecast();
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
                      $("<h5>")
                        .attr("class", "card-text")
                        .text("temperature:  " + response.main.temp + " C°"),
                      $("<h5>")
                        .attr("class", "card-text")
                        .text("wind speed:  " + response.wind.speed + " Km/h"),
                      $("<h5>")
                        .attr("class", "card-text")
                        .text("humidity:  " + response.main.humidity + " %"),
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
  
  cityList.forEach(function (searchInput) {
    if (searchInput){
        $("#history").append(
            $("<button>").addClass("btn btn-secondary mb-2").attr("data-city", searchInput).text(searchInput)
          );
    }
  });
}

function weatherForecast() {
  
  let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +'&lon=' + lon +'&appid=' + myApiKey;
  $.ajax({url: queryURL,method: "GET",}).then(function (response) {
    let iconCode = response.weather[0].icon;
  $("#history").empty();
  searchInput = $("#search-input").val("");
  $("#forecast").empty();
  for (var i = 1; i <6 ; i++) {    
      forecastEl.append(
    $('<div>', { class: 'col' }).append(
        $('<div>', { class: 'card forecast' }).append(
            $('<div>', { class: 'card-body' }).append([
                $('<h4>').attr('class','card-title').append($('<img>')),
                $('<p>').attr('class', 'card-text').text(response.daily[i].weather[0].main),
                $('<p>').attr('class', 'card-text').text(response.wind.speed),
                $('<p>').attr('class', 'card-text').text(response.daily[i].humidity)
            ])
        )
    )
);
  }
})
}

historyEl.on('click', '.btn-secondary', function (event) {
    event.preventDefault();
    let entry = event.target;
    console.log(entry);
    let city = entry.getAttribute('data-city');
    
    console.log(city);
    currentWeather(city);
})
