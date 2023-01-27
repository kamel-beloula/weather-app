// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
// taking the user input and allocate it to a variable
let inputGroup = $(".input-group-append");
// Here we are building the URL we need to query the database
$("#search-button").on("click", function(event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
  
    // Here we grab the text from the input box
    let searchInput = $("#search-input").val();
  
    // Here we construct our URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" +  searchInput + "&appid=" + APIKey;

    // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
    // and display it in the div with an id of movie-view
  
    // ------YOUR CODE GOES IN THESE DASHES.
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        let cityButton = $("<button>").text(response.name);
  
        let windButton = $("<button>").text(response.wind.speed); 
        
        let humidiyButton = $("<button>").text(response.main.humidity); 
        
        inputGroup.append(cityButton, windButton, humidiyButton);
    });
  
    // -----------------------------------------------------------------------
  
  });