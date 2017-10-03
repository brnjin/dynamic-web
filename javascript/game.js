var animals = ["horse", "cat", "dog", "lizard", "kiwi", "porcupine", "whale", "penguin", "gopher", "turtle", "unicorn", "duck"];

//Turns aniamls array to turn into buttons
function buttonCreator(){

	//Clear giphy every time button is clicked
	$('#giphy-dump').empty();
	//Loop to creat button tag
	for(var i = 0; i < animals.length; i++) {
		var buttonButton = $('<button>');
		//Adding class to later add event handler
		buttonButton.addClass("animal-buttons");
		//Added attribute to refer to 
		buttonButton.attr("data-name", animals[i]);
		//To show button names
		buttonButton.text(animals[i]);
		$('#generated-buttons').append(buttonButton);
	}

}
//Added API to each of the buttons being created
function animalGiphy(){
	var animal = $(this).attr('data-name');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
    	url: queryURL,
    	method: "GET"
    })
    .done(function(response){
    	console.log(queryURL);
    	var pictures = response.data;
    	//Loop to add pictures and ratings 
    	for (var i =0; i < pictures.length;i++){
    		var pictureDiv = $('<div>');
    		var p = $('<p>').text("Rating: " + pictures[i].rating);
    		var pictureImage = $('<img>');
    		pictureImage.attr('src', pictures[i].images.fixed_height.url);

    		pictureDiv.append(p);
    		pictureDiv.append(pictureImage);
    		$('#pictures-here').push(pictureDiv);
    	}
    })  

}


$('#generate').on("click", function(event){
	event.preventDefault();
	var animal = $('#user-input').val().trim();
	animals.push(animal);
	buttonCreator();
});

/*$(document).on('click','.animal-buttons');
buttonCreator();*/