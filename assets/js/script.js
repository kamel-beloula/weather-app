// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
let currentDate = moment().format('dddd, MMMM Do YYYY');
let history = $("#history");
let searchInput = $("#search-input").val().trim();
let todayEl =$("#today");
let forecastEl =$("#forecast");
let historyArray = [];
console.log(historyArray);

$("#search-button").on("click", function(event) {
    event.preventDefault();
  
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" +  searchInput + "&cnt=5&unit=metric&appid=" + APIKey +"&units=metric";

   
  
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
       console.log(response);
            todayEl.prepend([
                $('<div>').attr("class","row").append([
                    $('<div>').attr("class", 'col').append([
                        $('<div>').attr("class",'card rounded border border-secondary mb-2').append([
                            $('<div>').attr("class", "card-body").append([
                                $('<h2>').attr('class', 'card-title font-weight-bold').text(response.name +" "+currentDate).append($('<img>')),
                                $('<h5>').attr('class', 'card-text').text("temperature:  " + response.main.temp + " C°"),
                                $('<h5>').attr('class', 'card-text').text("wind speed:  " + response.wind.speed + " Km/h"),
                                $('<h5>').attr('class', 'card-text').text("humidity:  " + response.main.humidity + " %")
                            ])
                        ])
                    ])
                ])
            ]);
if()
            history.prepend($("<button>").addClass("btn btn-secondary mb-2").text(response.name));

            forecastEl.append(
                $('<div>', { class: 'col' }).append(
                    $('<div>', { class: 'card forecast' }).append(
                        $('<div>', { class: 'card-body' }).append([
                            $('<h4>').attr('class','card-title').append($('<img>')),
                            $('<p>').attr('class', 'card-text').text("temperature:  " + response.main.humidity),
                            $('<p>').attr('class', 'card-text').text("wind speed:  " + response.wind.speed),
                            $('<p>').attr('class', 'card-text').text("humidity:  " + response.main.humidity)
                        ])
                    )
                )
            );
      
        

        localStorage.setItem(searchInput, response.name);
    });
    
    searchInput = $("#search-input").val("");
    console.log(historyArray);
    // -----------------------------------------------------------------------
  
  });
  function renderCityButtons(cityname){//this function creates buttons simple way, it is used at the begining when retrieving old data
    let historySearch = $('<button>')
historySearch.text(cityname).attr('id',cityname).attr('style','width: 80%;').addClass('historyBtn btn-dark py-2 my-1 rounded')
oldBtns.append(historySearch)
}