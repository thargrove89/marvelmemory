/*script*/
$(document).ready(function(){
	
var checkArray = []; // checking if both clicked fields are the same fruit
var idCheck = []; // helper array for storing clicked fields IDs so i can remove "flipped" class if they are different
var counter = 0;
var end = 0; // for detecting if all fields are done
var fields = document.querySelectorAll(".back");
var natureSound = new Audio("http://k003.kiwi6.com/hotlink/2ai7iwz2j6/nature.mp3");
var spark = new Audio("http://k003.kiwi6.com/hotlink/qdpr7bioht/spark.mp3");
var win = new Audio("http://k003.kiwi6.com/hotlink/eptlrqspgk/win.mp3");


var images = [
	
	"images/hulk.jpg",
	"images/hulk.jpg",
	"images/blackpanther.jpg",
	"images/blackpanther.jpg",
	"images/spiderman.jpg",
	"images/spiderman.jpg",
	"images/wolverine.jpg",
	"images/wolverine.jpg",
	"images/thanos.jpg",
	"images/thanos.jpg",
	"images/ironman.jpeg",
	"images/ironman.jpeg"
		
];

function clicked() { // clicked function so i can unbind click event to prevet shit like clicking more then 2 fields at one try
	if ($(this).find(".inner-wrap").hasClass("flipped")) {
		return;
	}
	$(this).find(".inner-wrap").toggleClass("flipped");
	checkArray.push($(this).find("img").attr("src"));
	idCheck.push($(this).attr("id"));
	check();
}

$(".field").on("click", clicked);
	

function restart() {
	$(".back").find("img").remove(); //remove all current images from the field
	$(".field .inner-wrap").removeClass("flipped"); // remove flipped class so they can flip back again at the starting position
	checkArray = []; // empty check array
	idCheck = []; // empty IDs check array
	counter = 0; // reset counter
	end = 0; // reset ending variable
	startGame();
}

function checkEnd() {
	if (end === 12) { //if all 24 fields are uncovered 
		win.play();
		alert("You Win!!!");
		restart();
	}
}

function shuffleArray(array) { // shuffle array with images
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function startGame() {

	natureSound.play(); // play the background music

	var arr = shuffleArray(images); // stores the array of shuffled images

	for (var i = 0; i < fields.length; i++) { // appending those images to the div with class "back"
		var img = document.createElement("img");
		img.src = arr[i];
		fields[i].appendChild(img);
	}


}

function check() {
	if (checkArray.length === 2) { // if fields are clicked 2 times we are doing check
		$(".field").off("click", clicked); // disabling click event to prevet shit
		setTimeout(function(){
			if (checkArray[0] !== checkArray[1]) { // if there is  no match
				$("#" + idCheck[0]).find(".inner-wrap").removeClass("flipped"); // flip the field back
				$("#" + idCheck[1]).find(".inner-wrap").removeClass("flipped"); // second one flip back as well
				counter++;
				checkArray = []; //empty checking array for the next 2 clicks
				idCheck = []; // same with this one
				$(".field").on("click", clicked); // bind the click back again
			} else {
				spark.play();
				counter++;
				end += 2; // if there is a match "end" is raised by 2 as 2 fields are uncovered
				checkArray = []; // empty array for the next try
				idCheck = []; // this one as well
				checkEnd(); // check if game has eneded
				$(".field").on("click", clicked); // bind click again
			}
			document.querySelector(".counter").innerHTML = counter;
		}, 800);	
	}
}



startGame();

});