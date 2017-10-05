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
    	var results = response.data;
       	//Loop to add pictures and ratings 
    	for (var i =0; i < results.length;i++){
    		var pictureDiv = $('<div>');
    		var p = $('<p>').text("Rating: " + results[i].rating);
    		var pictureImage = 	$('<img>');
    		pictureImage.attr("src", results[i].images.url);
    		pictureDiv.append(p);
    		pictureDiv.append(pictureImage);
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
		$('#generated-buttons').prepend(buttonButton, " ");
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
//Load buttons that were generated once the page loads
$(document).on('click','.animal-buttons', animalGiphy);
buttonCreator();

/*
    	var ratings = response.rating;
    	var giphyDiv = $('<div class = "animal-buttons">');
    	console.log(ratings);
    	var p = $('<p>').text("Rating: " + ratings);
    	giphyDiv.append(p);
/*    	var imgURL = response.images.original_still.url;
    	var image = $('<img>').attr("src", imgURL);
    	giphyDiv.prepend(image);*/
    /*	$("#pictures-here").prepend(giphyDiv);*/