// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
// taking the user input and allocate it to a variable
let history = $("#history");
// Here we are building the URL we need to query the database
$("#search-button").on("click", function(event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
  
    // Here we grab the text from the input box
    let searchInput = $("#search-input").val();
    let todayEl =$("#today");
    let forecastEl =$("#forecast");
  
    // Here we construct our URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" +  searchInput + "&cnt=5&appid=" + APIKey;

    // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
    // and display it in the div with an id of movie-view
  
    
    // ------YOUR CODE GOES IN THESE DASHES.
  historyArray = [];
  console.log(historyArray);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
       console.log(response);
            todayEl.append([
                $('<div>').attr("class","row").append([
                    $('<div>').attr("class", 'col').append([
                        $('<div>').attr("class",'card rounded border border-secondary').append([
                            $('<div>').attr("class", "card-body").append([
                                $('<h2>').attr('class', 'card-title font-weight-bold').text("city:  " + response.name).append($('<img>')),
                                $('<h5>').attr('class', 'card-text').text("temperature:  " + response.main.humidity),
                                $('<h5>').attr('class', 'card-text').text("wind speed:  " + response.wind.speed),
                                $('<h5>').attr('class', 'card-text').text("humidity:  " + response.main.humidity)
                            ])
                        ])
                    ])
                ])
            ]);
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
      
        history.append($("<button>").attr("class","btn").text(response.name));

        localStorage.setItem(searchInput, response.name);
    });
    searchInput = $("#search-input").val("");
    console.log(historyArray);
    // -----------------------------------------------------------------------
  
  });