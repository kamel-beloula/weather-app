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
  weatherForecast()
});

function currentWeather() {
  let searchInput = $("#search-input").val().trim();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    searchInput +
    "&cnt=5&unit=metric&appid=" +
    APIKey +
    "&units=metric";

  cityList.unshift(searchInput);
  localStorage.setItem("history", JSON.stringify(cityList));

  console.log(cityList);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    let iconCode = response.weather[0].icon;
    todayEl.empty();
    todayEl.prepend([
      $("<div>")
        .attr("class", "row")
        .append([
          $("<div>")
            .attr("class", "col")
            .append([
              $("<div>")
                .attr("class", "card rounded border border-secondary mb-2")
                .append([
                  $("<div>")
                    .attr("class", "card-body")
                    .append([
                      $("<h2>")
                        .attr("class", "card-title font-weight-bold")
                        .text(response.name + " on " + currentDate)
                        .append(
                          $("<img>").attr(
                            "src",
                            "https://openweathermap.org/img/wn/" +
                              iconCode +
                              "@2x.png"
                          )
                        ),
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
  });
}

function renderCityButtons() {
  $("#history").empty();
  searchInput = $("#search-input").val("");
  cityList.forEach(function (searchInput) {
    if (searchInput){
        $("#history").append(
            $("<button>").addClass("btn btn-secondary mb-2").attr("data-city", searchInput).text(searchInput)
          );
    }
  });
}

// forecastEl.append(
//     $('<div>', { class: 'col' }).append(
//         $('<div>', { class: 'card forecast' }).append(
//             $('<div>', { class: 'card-body' }).append([
//                 $('<h4>').attr('class','card-title').append($('<img>')),
//                 $('<p>').attr('class', 'card-text').text("temperature:  " + response.main.humidity),
//                 $('<p>').attr('class', 'card-text').text("wind speed:  " + response.wind.speed),
//                 $('<p>').attr('class', 'card-text').text("humidity:  " + response.main.humidity)
//             ])
//         )
//     )
// );

// -----------------------------------------------------------------------

// $("#history").on("click","button", function(event) {
//     event.preventDefault();
//     currentWeather();
// })

historyEl.on('click', '.btn-secondary', function (event) {
    event.preventDefault();
    let entry = event.target;
    console.log(entry);
    let city = entry.getAttribute('data-city');
    
    console.log(city);
    currentWeather(city);
})

function weatherForecast(){
    let fiveDaysURL = "https://api.openweathermap.org/data/2.5/weather?" +"q=" + searchInput + "&cnt=5&unit=metric&appid=" + APIKey +
    "&units=metric";
$.ajax({
    url: fiveDaysURL,
    method:'get'
}).then(function (response){
    let forecastDay = moment()//making sure i have 5 days forecast headings
    let y = 0 //this is variable I am using to increse the date in moment js inside the loloop later on
    forecastRow.empty()//clearing up old
    let headingMain = $('<h2>');//creating heading for the forcast row
    headingMain.text('Five days forecast : ').addClass('w-100 mb-2')//heading width was set to 100% in bootstrap so it doesnt mess around
    forecastRow.append(headingMain)
for (let i = 3; i < 40; i += 8 ){
    //index increasing by 8, because in the response object there is information for 5 days for every 3 hours, 8*3= 24 so it adds up to a day
    //creating HTML elements
    y +=1 //this will increase date (together with line bellow)
    forecastDay = moment().add(y, 'day').format('DD/MM/YYYY')
    let iconID = response.list[i].weather[0].icon
    let fcIconSource = 'https://openweathermap.org/img/wn/' + iconID + '@2x.png' //creating url for icon based on in-object information
    let fcIcon = $('<img>');
    fcIcon.attr('src',fcIconSource)//adding the newly made url as src attribute in image
    fcIcon.attr('alt', 'icon matching weather forecast');
    let forecastBox = $('<article>')
    //accessing values form the object
    let fcTemp = response.list[i].main.temp;
    fcTemp -= 273.15;
    fcTemp = fcTemp.toFixed(2);
    let fcWind = response.list[i].wind.speed;
    fcWind /= 1.609344;
    fcWind = fcWind.toFixed(2);
    let fcHumidity = response.list[i].main.humidity;
    
//creating html elements
    let fcheading = $('<h3>')
    fcheading.text(forecastDay)
    let forecastTemp = $('<p>');
    forecastTemp.text(`Temp: ${fcTemp}°C`); 
    let forecastWind = $('<p>');
    forecastWind.text(`Wind: ${fcWind}MPH`);
    let forecastHum = $('<p>');
    forecastHum.text(`Humidity: ${fcHumidity}%.`)
    forecastBox.addClass('bg-info m-1 p-1 rounded text-center text-dark border border-dark col-lg-2 col-sm-4 col-md-4 col-10 align-items-center text-wrap')
    forecastBox.append(fcIcon, fcheading,  forecastTemp, forecastWind, forecastHum)
    forecastRow.append(forecastBox)
}
})
}