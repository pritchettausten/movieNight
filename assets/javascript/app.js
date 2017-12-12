//taco search
//=============================================================================

var queryURL = "https://taco-randomizer.herokuapp.com/random/?full-taco=true"

$("#tacoButton").on("click", function() {
	$.ajax({
	      url: queryURL,
	      method: "GET"
	}).done(function(response) {

    	event.preventDefault();

//formating the JSON to be readable on the html

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

//popular button search to find random movie
//=============================================================================

$("#popularButton").on("click", function () {
    event.preventDefault();
    $("#movieSuggestion").empty();
    $("#rating").empty();
    $("#movieTitle").empty();
    
	var apiKey = "66d2f01d5d725968495c8ffdb6e13ab7"
	var pageNumber = Math.floor(Math.random() * 100) + 1;
	var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNumber;

    $.ajax({
    url: queryURL, 
    method: 'GET'
    }).done(function(response){
    	
        var randomNum = Math.floor(Math.random() * 19);
        var posterURL = "https://image.tmdb.org/t/p/w500"
        var imageTag = $("<img>").attr("src", posterURL + response.results[randomNum].poster_path);

//creates new div for the movie information to print on html page

        var greatDiv = $("<div>");
                var newImg = $("<img>").attr("src", posterURL + response.results[randomNum].poster_path);
                	newImg.attr("style", "width: 342px;", "height: auto;")    
            	var paragraphOne = $("<h1>").text(response.results[randomNum].title);
                var gap = $("<p>").text(" ");
                var paragraphThree = $("<p>").text("Average Rating: " + response.results[randomNum].vote_average);
               
                $("#movieTitle").append(paragraphOne);
                greatDiv.append(newImg);
                greatDiv.append(gap);
                greatDiv.append(paragraphThree);
                

               $("#movieSuggestion").append(greatDiv);
		
//ajax call for seperate plot and rating

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
		            	it.attr("style", "text-align: center;");
                	$("#rating").append(it);
		        });
    })
});

//search for a movie similar to whatever you want
//=============================================================================

var possibles = [];
var rating;

$("#movieButton").on("click", function () {
	event.preventDefault();
	$("#movieSuggestion").empty();
	$("#rating").empty();
	$("#movieTitle").empty();
	var userInput = $("#input1").val().trim();
	$("#input1").val("");
	
//gets id of user input movie

	var queryUrl = "https://api.themoviedb.org/3/search/movie?api_key=66d2f01d5d725968495c8ffdb6e13ab7&query=" + userInput;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response) {
            
            var jack = response.results[0].id;
            var similarUrl = "https://api.themoviedb.org/3/movie/" + jack + "/similar?api_key=66d2f01d5d725968495c8ffdb6e13ab7&language=en-US&page=" + response.total_pages;

//uses the id of the movie to get similar movies

            $.ajax({
                url: similarUrl,
                method: "GET"
            }).done(function(response) {
                
//makes an array of divs from the list of similar movies

                for (var i = 0; i < 20; i++) {
                    var posterSource = "https://image.tmdb.org/t/p/w342";
                    var greatDiv = $("<div>");
                    var title = $("<h1>").text(response.results[i].title);
                    	title.addClass("searchTitle");
                    var newImg = $("<img>").attr("src", posterSource + response.results[i].poster_path);
                    var gap = $("<p>").text(" ");
               		var paragraphThree = $("<p>").text("Average Rating: " + response.results[i].vote_average);
                    greatDiv.append(title);
                    greatDiv.append(newImg);
                    greatDiv.append(gap);
                    greatDiv.append(paragraphThree);

                    possibles.push(greatDiv);
                };
             
//displays a random div from the array

                function displayIt () {
	                var item = possibles[Math.floor(Math.random()*possibles.length)];
	                
	               
	                $("#movieSuggestion").append(item);
	                
                };
                
                displayIt ();

//ajax call for seperate plot and rating

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
				            	it.attr("style", "text-align: center;");
		                	$("#rating").append(it);
				            
					        });  
            });
        });
});
//search by genre button
//=============================================================================

$("#genreButton").on("click", function () {
        event.preventDefault();
        $("#movieSuggestion").empty();
        $("#rating").empty();
        $("#movieTitle").empty();
   
//uses the value given to the genre selected to pull up a random movie from that genre

    var genreNum = $("#genreList").val();   

//returns a random page number so that we can get back a wider selection of movies

    var pageNumber = Math.floor(Math.random() * 10) + 1;
    var queryURL = "https://api.themoviedb.org/3/genre/"+ genreNum + "/movies?api_key=66d2f01d5d725968495c8ffdb6e13ab7&language=en-US&include_adult=false&sort_by=created_at.asc&page=" + pageNumber;

        $.ajax({
        url: queryURL, 
        method: 'GET'
        }).done(function(response){

//page loads 20 movies so we just grab a random one

            var randomNum = Math.floor(Math.random() * 19);
            var posterURL = "https://image.tmdb.org/t/p/w342"
            var imageTag = $("<img>").attr("src", posterURL + response.results[randomNum].poster_path);

//creates new div for the movie information to print on html page

            var greatDiv = $("<div>");
                    var newImg = $("<img>").attr("src", posterURL + response.results[randomNum].poster_path);    
                   	var paragraphOne = $("<h1>").text(response.results[randomNum].title);
                    var gap = $("<p>").text(" ");
                    var paragraphThree = $("<p>").text("Average Rating: " + response.results[randomNum].vote_average);

                    $("#movieTitle").append(paragraphOne);
                    greatDiv.append(newImg);
                    greatDiv.append(gap);
                    greatDiv.append(paragraphThree);

                   $("#movieSuggestion").append(greatDiv);
            
//ajax call for seperate plot and rating

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
		            	it.attr("style", "text-align: center;");
                	$("#rating").append(it);
		        });
        })
});

//calling firebase
//=============================================================================

var config = {
    apiKey: "AIzaSyC5JwzL0Xv5H-dXwjbDhM5lSmPNCSxLJ6M",
    authDomain: "my-first-firebase-a427f.firebaseapp.com",
    databaseURL: "https://my-first-firebase-a427f.firebaseio.com",
    projectId: "my-first-firebase-a427f",
    storageBucket: "my-first-firebase-a427f.appspot.com",
    messagingSenderId: "170032079984"
  };
  firebase.initializeApp(config);

  database = firebase.database();

	var cumulativeRating;
	var numRating;
	  database.ref("newwestUsers").on("value", function (snapshot) {
	      cumulativeRating = snapshot.val().cumulativeRatings;
	      numRating = snapshot.val().numRatings;
	      var averageRat = cumulativeRating / numRating;
	      var averageRating = Math.max( Math.round(averageRat * 10) / 10, 2.8 ).toFixed(1);
	      console.log(averageRating);
	      $("#theRating").text("The Average User Rating is: " + averageRating);

	});

	$(".star").on("click", function () {
	    var valueOf = $(this).val();
	    var thisIsNew = +numRating + +1;
	    var thisIsAlsoNew = +cumulativeRating + +valueOf;
		    database.ref("newwestUsers").set({
		        cumulativeRatings: thisIsAlsoNew,
		        numRatings: thisIsNew
		    });
	});	    
//sign in as exsisting user

	$("#signIn").on("click", function  (e) {
	    var email = $("#email").val().trim();
	    var password = $("#password").val().trim();
	    var auth = firebase.auth();
	    
	    var promise = auth.signInWithEmailAndPassword(email, password);
	    	promise.catch(console.log(e.message));
	});

//adds the user to firebase and logs in

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

//adds a welcome element and a rating section if logged in

	firebase.auth().onAuthStateChanged(firebaseUser => {
	    if (firebaseUser) {
	        console.log(firebaseUser);
	        console.log(firebaseUser.email);
	        $("#thePanel").addClass("hide");
	        $("#logout").removeClass("hide");
	        $("#loginDiv").html("<h4>" + "Welcome: " + firebaseUser.email);
	        $("#logout").removeClass("hide");
	        $("#leave").removeClass("hide");
			$("#theStars").removeClass("hide");

	    } else {
	        console.log("Not Logged In");
	        $("#thePanel").removeClass("hide");
	        $("#logout").addClass("hide");
	        $("#loginDiv").text("Login");
	        $("#leave").addClass("hide");
			$("#theStars").addClass("hide");
	    }
	});

var emailInvite = {
    to_email: "",
    reply_to: "",
    from_name: "",
    to_name: "",
    taco_movie: ""
};

$("#viewEmail").on("click", function () {
    event.preventDefault();

	emailInvite.to_email = $("#to_email").val();
	emailInvite.reply_to = $("#reply_to").val();
	emailInvite.from_name = $("#from_name").val();
	emailInvite.to_name = $("#to_name").val();
	emailInvite.taco_movie = $("#taco_movie").val();

	$("#sentTo").text("Send to: " + emailInvite.to_email)
	$("#sentBy").text("Send from: " + emailInvite.reply_to)

	$("#exampleEmail").text("Hello, " + emailInvite.to_name + ". You've just been invited to enjoy a spicy taco and movie with " + emailInvite.from_name + ", who says, " + emailInvite.taco_movie + " Sincerely, Your Taco Team")

    $("#emailDisplay").modal("show");
});

$("#sendEmail").on("click", function () {
       event.preventDefault();
       $("#emailDisplay").modal("hide");
    
       emailjs.send("tacos8movies","taco_email", emailInvite)
        .then(function(response) {
        console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
		},	function(err) {
		  	console.log("FAILED. error=", err);
			});

});