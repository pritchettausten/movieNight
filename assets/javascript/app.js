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



$("#movieButton").on("click", function() {
	$("#movieSuggestion").text("Here is your movie");
});