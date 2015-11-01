//declaring vars
var score = 0;
var missed = 0;
var timer;

//setup function
$(document).ready( function() {
	
	//play music
	var audio = new Audio("Sound.wav");
	audio.loop = true;
	audio.play();
	
	//generating the mole hole table 3x3
	var moleholes = document.getElementById("moleholes");
	for (var i=0; i < 3; i++) {
		var row = document.createElement("tr");
		for (var j=0; j < 3; j++) {
			var cell = document.createElement("td");
			//setting ids to cells helps later when generating random moles
			cell.id = "cell"+(i*3+j).toString();
			row.appendChild(cell);
		}
		moleholes.appendChild(row);
	}
	
	//call showMole() every second resulting in 1 mole per second
	timer = setInterval(showMole, 1000)
	
	var clickHandler = function() {
		if ($(this).hasClass("mole")) {
			//if you click on td with mole score goes up 25 pts.
			score += 25;
			//remove mole from td
			$(this).removeClass("mole");
		}		
		else {
			//remove 5 pts. for hitting hole with no mole
			score -= 5;
		}
		//setting the score from js var to html text
		$("#score").html(score.toString());
	}
	
	//click/tap handler for every td
	$("td").click(clickHandler);
	$("td").on("tap",clickHandler);
});

//make moles appear
function showMole() {
	
	//calls function over each td
	$("td").each( function( index, element ) {
		if ($(element).hasClass("mole")) {
			//does var operations if you don't hit the mole in time
			score -= 10;
			missed += 1;
			$(this).removeClass("mole");
		}
	});
	
	//get rid of decimal in random number of hole id
	//hole can be 0->8
	var hole = Math.floor(Math.random() * 9);
	$("#cell"+hole.toString()).addClass("mole");
	
	//changing js vars to html text
	$("#score").html(score.toString());
	$("#missed").html(missed.toString());
	
	//when you've missed 10 moles call gameOver()
	if (missed >= 10){
		gameOver();
	}
}

//game over :(
function gameOver(){
	clearInterval(timer);
	$("#moleholes").empty().hide();
	
}
