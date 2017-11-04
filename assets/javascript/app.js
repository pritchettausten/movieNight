var queryURL = "http://taco-randomizer.herokuapp.com/random/?full-taco=true"

$("#tacoButton").on("click", function() {
	$.ajax({
	      url: queryURL,
	      method: "GET"
	}).done(function(response) {

    	event.preventDefault();

		console.log(response);

		$("#recipe").html("<pre style='word-wrap: break-word; white-space: pre-wrap;'>");
		$("pre").append(response.recipe);
		$("pre").append("<br>")
		$("pre").append("<br>")
		$("pre").append(response.base_layer.recipe);
		$("pre").append("<br>")
		$("pre").append("<br>")
		$("pre").append(response.condiment.recipe);
		$("pre").append("<br>")
		$("pre").append("<br>")
		$("pre").append(response.mixin.recipe);

	});
});

var possibles = [];
var rating;
$("#movieButton").on("click", function () {
	event.preventDefault();
	$("#movieSuggestion").empty();
	var userInput = $("#input1").val().trim();
	$("#input1").val("");
	console.log(userInput)
	var queryUrl = "https://api.themoviedb.org/3/search/movie?api_key=66d2f01d5d725968495c8ffdb6e13ab7&query=" + userInput;
    var otherURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece";        

		$.ajax({
		            url: otherURL,
		            method: "GET"
		        }).done(function(response) {
		            
		            var rating = response.Rated;
		            var it = $("<p>").text(rating);
                	$("#rating").append(it);
		            console.log(rating);
		        });  
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response) {
            // console.log(response);
            var jack = response.results[0].id
            console.log(jack);
            var similarUrl = "https://api.themoviedb.org/3/movie/" + jack + "/similar?api_key=66d2f01d5d725968495c8ffdb6e13ab7&language=en-US&page=1";

            $.ajax({
                url: similarUrl,
                method: "GET"
            }).done(function(response) {
                console.log(response);
                for (var i = 0; i < 20; i++) {
                    var posterSource = "https://image.tmdb.org/t/p/w342";
                    var greatDiv = $("<div>");
                    var title = $("<h1>").text(response.results[i].title);
                    var newImg = $("<img>").attr("src", posterSource + response.results[i].poster_path);
                    var overview = $("<p>").text(response.results[i].overview);
                    var rating= $("<p>").text("Average Rating: " + response.results[i].vote_average);
                    greatDiv.append(title);
                    greatDiv.append(newImg);
                    greatDiv.append(overview);
                    greatDiv.append(rating);
                    possibles.push(greatDiv);
                }


                console.log(possibles);
                
                function displayIt () {
                var item = possibles[Math.floor(Math.random()*possibles.length)];
                console.log(item);
                console.log(rating);
                // var it = $("<p>").text(rating);
                // 	item.append(it);
                
                $("#movieSuggestion").append(item);
                
                };
                displayIt ();

            });








        });

});

var apiKey = "66d2f01d5d725968495c8ffdb6e13ab7"
var genreNum = "";

    $("#genreButton").on("click", function () {
        event.preventDefault();
        $("#movieSuggestion").empty();
        console.log("push");

    genreNum = $("#genreList").val();
    
    console.log(genreNum);

    var queryURL = "https://api.themoviedb.org/3/genre/"+ genreNum + "/movies?api_key=" + apiKey + "&language=en-US&include_adult=false&sort_by=created_at.asc";


        $.ajax({
        url: queryURL, 
        method: 'GET'
        }).done(function(response){

            console.log(response);

            var randomNum = Math.floor(Math.random() * 19);
            var posterURL = "https://image.tmdb.org/t/p/w342"
            var imageTag = $("<img>").attr("src", posterURL + response.results[randomNum].poster_path);




            $("#movie-title").text(response.results[randomNum].title);

            $("#movie-release").text(response.results[randomNum].release_date);
            $("#movie-poster").html(imageTag);

            $("#movie-overview").text(response.results[randomNum].overview);
            $("#movie-rating").text("Average rating: " + response.results[randomNum].vote_average);
            
        })

    });

