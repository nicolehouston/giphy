// Array of topics
var topics = ["iron man", "captain america", "thor", "wonder woman", "black panther", "superman", "black widow", "spiderman", "batman"];

// Fuction that makes buttons for each topic
function displayButtons(){

    $(".buttons").empty();

    for (var i = 0; i < topics.length; i++){
        var btn = $("<button class='heroButton'>");
        btn.attr("value", topics[i]);
        btn.text(topics[i]);
        $(".buttons").append(btn);
    }
}

displayButtons();

// This function is called when the user clicks on a superhero button. It displays the 10 gifs of the superhero chosen
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
            var gifDiv = $("<div class='gifDiv'>");
            var stillGif = $("<img class='gif'>").attr("src", results[i].images.original_still.url);
            stillGif.attr("data-still", results[i].images.original_still.url);
            stillGif.attr("data-animate", results[i].images.original.url);
            stillGif.attr("data-state", "still"); 
            gifDiv.append(stillGif);

            var rating = $("<p class='rating'>").text("Rating: " + results[i].rating);
            gifDiv.append(rating);
            
            $("#gifContainer").prepend(gifDiv);
        }
    });
})

// This function renders a new button based on user input
$("#addSuperhero").on("click", function(){
    event.preventDefault();
    var superhero = $("#superhero-input").val().trim();
    
    if((topics.indexOf(superhero) === -1) && (superhero !== "")){
        topics.push(superhero);
        displayButtons();    
    }
    $("#superhero-input").val('');  
})

// This function is called when the user clicks on a still gif. It animates the gif and if the user clicks it again, it stops the gif.
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
