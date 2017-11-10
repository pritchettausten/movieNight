var queryURL = "http://taco-randomizer.herokuapp.com/random/?full-taco=true"

$("#tacoButton").on("click", function() {
	$.ajax({
	      url: queryURL,
	      method: "GET"
	}).done(function(response) {

    	event.preventDefault();

		

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

$.ajax({
        url: "https://api.themoviedb.org/3/genre/movie/list?api_key=66d2f01d5d725968495c8ffdb6e13ab7&language=en-US", 
        method: 'GET'
        }).done(function(response){
            
        });

    $("#popularButton").on("click", function () {
        event.preventDefault();
        $("#movieSuggestion").empty();
        $("#rating").empty();
        

    var apiKey = "66d2f01d5d725968495c8ffdb6e13ab7"

    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";


        $.ajax({
        url: queryURL, 
        method: 'GET'
        }).done(function(response){

           

            var randomNum = Math.floor(Math.random() * 19);
            var posterURL = "https://image.tmdb.org/t/p/w500"
            var imageTag = $("<img>").attr("src", posterURL + response.results[randomNum].poster_path);


            var greatDiv = $("<div>");
                    var newImg = $("<img>").attr("src", posterURL + response.results[randomNum].poster_path);    
                	var paragraphOne = $("<h1>").text(response.results[randomNum].title);
                    var paragraphTwo = $("<p>").text(response.results[randomNum].overview);
                    var paragraphThree = $("<p>").text("Average Rating: " + response.results[randomNum].vote_average);
                    var gap = $("<p>").text(" ");
                    greatDiv.append(paragraphOne);
                    greatDiv.append(newImg);
                    greatDiv.append(gap);
                    // greatDiv.append(paragraphTwo);
                    greatDiv.append(paragraphThree);

                   $("#movieSuggestion").append(greatDiv);
    		
    		var userInput = response.results[randomNum].title;
    		var otherURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=full&apikey=40e9cece";        
			
			$.ajax({
			            url: otherURL,
			            method: "GET"
			        }).done(function(response) {
			            
			            console.log(response);
			            var rating = response.Rated;
			            var story = response.Plot;
			            var that = $("<p>").text(story);
			            $("#rating").append(that);
			            var it = $("<p>").text(rating);
	                	$("#rating").append(it);

			            
			        });
            
        })

});

var possibles = [];
var rating;
$("#movieButton").on("click", function () {
	event.preventDefault();
	$("#movieSuggestion").empty();
	$("#rating").empty();
	var userInput = $("#input1").val().trim();
	$("#input1").val("");
	
	var queryUrl = "https://api.themoviedb.org/3/search/movie?api_key=66d2f01d5d725968495c8ffdb6e13ab7&query=" + userInput;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response) {
            // console.log(response);
            var jack = response.results[0].id
            
            var similarUrl = "https://api.themoviedb.org/3/movie/" + jack + "/similar?api_key=66d2f01d5d725968495c8ffdb6e13ab7&language=en-US&page=1";

            $.ajax({
                url: similarUrl,
                method: "GET"
            }).done(function(response) {
                
                for (var i = 0; i < 20; i++) {
                    var posterSource = "https://image.tmdb.org/t/p/w342";
                    var greatDiv = $("<div>");
                    var title = $("<h1>").text(response.results[i].title);
                    	title.addClass("searchTitle");
                    var newImg = $("<img>").attr("src", posterSource + response.results[i].poster_path);
                    var overview = $("<p>").text(response.results[i].overview);
                    var rating= $("<p>").text("Average Rating: " + response.results[i].vote_average);
                    var gap = $("<p>").text(" ");
                    greatDiv.append(title);
                    greatDiv.append(newImg);
                    greatDiv.append(gap);
                    greatDiv.append(rating);
                    possibles.push(greatDiv);
                }
                
                function displayIt () {
	                var item = possibles[Math.floor(Math.random()*possibles.length)];
	                
	               
	                $("#movieSuggestion").append(item);
	                
                };
                displayIt ();

			    var search = $(".searchTitle");
			    var searchTitle = search[0].innerHTML;
			    
			    var otherURL = "https://www.omdbapi.com/?t=" + searchTitle + "&y=&plot=full&apikey=40e9cece";        

				$.ajax({
				            url: otherURL,
				            method: "GET"
				        }).done(function(response) {
				            
				            var story = response.Plot;
					        var that = $("<p>").text(story);
					        $("#rating").append(that);
				            var rating = response.Rated;
				            var it = $("<p>").text(rating);
		                	$("#rating").append(it);
				            
					        });  
            });

        });

});

$("#genreButton").on("click", function () {
        event.preventDefault();
        $("#movieSuggestion").empty();
        $("#rating").empty();
        

    var apiKey = "66d2f01d5d725968495c8ffdb6e13ab7"
    var genreNum = "";

    genreNum = $("#genreList").val();
    
    

    var queryURL = "https://api.themoviedb.org/3/genre/"+ genreNum + "/movies?api_key=" + apiKey + "&language=en-US&include_adult=false&sort_by=created_at.asc";

        $.ajax({
        url: queryURL, 
        method: 'GET'
        }).done(function(response){

            

            var randomNum = Math.floor(Math.random() * 19);
            var posterURL = "https://image.tmdb.org/t/p/w342"
            var imageTag = $("<img>").attr("src", posterURL + response.results[randomNum].poster_path);


            var greatDiv = $("<div>");
                    var newImg = $("<img>").attr("src", posterURL + response.results[randomNum].poster_path);    
                   	var paragraphOne = $("<h1>").text(response.results[randomNum].title);
                    var paragraphTwo = $("<p>").text(response.results[randomNum].overview);
                    var paragraphThree = $("<p>").text("Average Rating: " + response.results[randomNum].vote_average);
                    var gap = $("<p>").text(" ");
                    greatDiv.append(paragraphOne);
                    greatDiv.append(newImg);
                    greatDiv.append(gap);
                    // greatDiv.append(paragraphTwo);
                    greatDiv.append(paragraphThree);

                   $("#movieSuggestion").append(greatDiv);
            
     	var userInput = response.results[randomNum].title;
     	var otherURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=full&apikey=40e9cece";        

		$.ajax({
		            url: otherURL,
		            method: "GET"
		        }).done(function(response) {
		            
		            var story = response.Plot;
			        var that = $("<p>").text(story);
			        $("#rating").append(that);
		            var rating = response.Rated;
		            var it = $("<p>").text(rating);
                	$("#rating").append(it);
		            
		        });
        })
});

var config = {
    apiKey: "AIzaSyCZe0YaRus25JZ15Mnvg7RFAKgQd8zoTMY",
    authDomain: "classproject-326e1.firebaseapp.com",
    databaseURL: "https://classproject-326e1.firebaseio.com",
    projectId: "classproject-326e1",
    storageBucket: "classproject-326e1.appspot.com",
    messagingSenderId: "480119801997"
  };
  firebase.initializeApp(config);



$("#signIn").on("click", function  (e) {
    var email = $("#email").val().trim();
      var password = $("#password").val().trim();
      var auth = firebase.auth();
     

     var promise = auth.signInWithEmailAndPassword(email, password);
      promise.catch(console.log(e.message));
});

$("#createUser").on("click", function  (e) {
    var email = $("#email").val().trim();
      var password = $("#password").val().trim();
      var auth = firebase.auth();
    

     var promise = auth.createUserWithEmailAndPassword(email, password);
      promise.catch(console.log(e.message));
});
$("#logout").on("click", function () {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        console.log(firebaseUser.email);
        $("#thePanel").addClass("hide");
        $("#logout").removeClass("hide");
        $("#loginDiv").html("<h4>" + "Welcome: " + firebaseUser.email);
        $("#logout").removeClass("hide");
        $("#leave").removeClass("hide");


    } else {
        console.log("Not Logged In");
        $("#thePanel").removeClass("hide");
        $("#logout").addClass("hide");
        $("#loginDiv").text("Login");
        $("#leave").addClass("hide");
    }
});
