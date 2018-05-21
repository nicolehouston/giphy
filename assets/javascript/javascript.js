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
        results = response.data;
        for(var i = 0; i < 10; i++){
            var stillGiph = $("<img>").attr("src", results[i].images.original_still.url);
            $("#giphContainer").append(stillGiph);
        }
    });
})