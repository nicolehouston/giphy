// Array of topics
var topics = ["iron man", "captain america", "thor", "wonder woman", "black panther", "superman", "black widow", "spiderman", "batman"];

// Fuction that makes buttons for each topic
function displayButtons(){
    for (var i = 0; i < topics.length; i++){
        var btn = $("<button>");
        btn.attr("value", topics[i]);
        btn.text(topics[i]);
        $(".buttons").append(btn);
    }
}

displayButtons();

$(".buttons").on("click", "button", function(){

    var superhero = $(this).val();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superhero + "&api_key=4RnlpSHJp6RDZ2NtQvbDsAsbbFtzQgjc";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        results = response.data;
        for(var i = 0; i < 10; i++){
            var stillGif = $("<img class='gif'>").attr("src", results[i].images.original_still.url);
            stillGif.attr("data-still", results[i].images.original_still.url);
            stillGif.attr("data-animate", results[i].images.original.url);
            stillGif.attr("data-state", "still"); 
            $("#gifContainer").append(stillGif);
        }
    });
})

$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }

      else if (state === "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
})