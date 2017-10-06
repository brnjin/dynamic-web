var animals = ["horse", "cat", "dog", "lizard", "kiwi", "porcupine", "whale", "penguin", "gopher", "turtle", "unicorn", "duck"];

//Added API to each of the buttons being created
function animalGiphy(){
	$('#pictures-here').empty();
	var animal = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response){
    	console.log(queryURL);
    	//Variable to access the giphy data easier
    	var results = response.data;
       	//Loop to add pictures and ratings 
    	for (var i =0; i < results.length;i++){
    		//Adds div tag on the document
    		var pictureDiv = $('<div class="test">');
    		//Getting the rating data and diplaying it on the document
    		var p = $('<p>').text("Rating: " + results[i].rating);
    		//Adds img tag to dipaly image
    		var pictureImage = 	$('<img>');
    		//Variable to grab the static image
    		pictureImage.attr("data-state", "still"); 
    		pictureImage.attr("src", results[i].images.fixed_width_still.url);
    		pictureImage.attr("data-still", results[i].images.fixed_width_still.url);
    		pictureImage.attr("data-animate", results[i].images.fixed_width.url);
    		//Adding rating at the end of the element
    		pictureImage.attr('class','animate');
    		pictureDiv.prepend(p);
    		//Adding picture of the element
    		pictureDiv.append(pictureImage);
    		//Display rating and static picture on the document
    		$('#pictures-here').prepend(pictureDiv);	
    	}
    }); 
}

//Turns animals array to turn into buttons
function buttonCreator(){

	//Clear giphy every time button is clicked
	$('#generated-buttons').empty();
	//Loop to creat button tag
	for(var i = 0; i < animals.length; i++) {
		var buttonButton = $('<button>');
		//Adding class to later add event handler
		buttonButton.addClass("animal-buttons");
		//Added attribute to refer to 
		buttonButton.attr("data-name", animals[i]);
		//To show button names
		buttonButton.text(animals[i]);
		$('#generated-buttons').append(buttonButton, " ");
	};

};

//Event handler for the generate button
$('#generate').on("click", function(event){
	event.preventDefault();
	//Storing user data
	var animal = $('#user-input').val().trim();
	animals.push(animal);
	buttonCreator();
});

$(document).on("click", '.animate', function(){
	var state = $(this).attr("data-state");
	if (state === "still") {
	    $(this).attr("src", $(this).attr("data-animate"));
	    $(this).attr("data-state", "animate");
	} else {
	    $(this).attr("src", $(this).attr("data-still"));
	    $(this).attr("data-state", "still");
	}
	console.log(1234)
})
//Load buttons that were generated once the page loads
$(document).on('click','.animal-buttons', animalGiphy);
buttonCreator();