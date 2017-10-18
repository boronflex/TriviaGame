$(document).click(function(){
  $("#clickanywhere").hide();
  gameLogic.questionAnswerTimer();
  // view.displayQuestionAnswers(); // this is still in the wrong place
});

$(".answer-button").click(function(){
	getAnswer();
});

// view.displayQuestionAnswers();//this is out of place
	

//TODO:

//get timer working counting down and displaying in the span set up html
	//will need a separate time or a method to use the same timer to count between questions
	//refer to stopwatch exercise to help set up the timer
var gameLogic = {
	
	timerDisplay: 10,

	// breakTimer: 5,

	isQuestion: true,

	clockRunning: false,//copied from stopwatch activity

	intervalQuestion: 0,

	answered: false,//flag for answered before time up

	questionAnswerTimer: function(){

		//if the its in a question portion
		//call question timer

		if (!gameLogic.clockRunning) {//copied from stopwatch activity
	        
	        gameLogic.intervalQuestion = setInterval(gameLogic.decrementQuestion, 1000);
	        gameLogic.clockRunning = true;
	    }

	    //if its in the break portion
	    //call break timer

	    // if (!gameLogic.clockRunning){
	    // 	gameLogic.intervalQuestion = setInterval(gameLogic.decrementBreak, 1000);
	    //     gameLogic.clockRunning = true;
	    // }
	    // //
		
	},

	decrementQuestion: function(){

		//before decrement checks whether or not in a question or answer display mode
		//question is true - answer is false

		//if the question isnt answered

		if (gameLogic.answered === false){

			console.log("in question block")

			gameLogic.timerDisplay -= 1;

			$("#time-remaining-number").text(gameLogic.timerDisplay);

			//show the question until time runs out
				//if the time runs out
					
			if (gameLogic.timerDisplay === 0){

				gameLogic.answered = true;
				gameLogic.clockRunning = false;
				gameLogic.timerDisplay = 5;
				clearInterval(gameLogic.intervalQuestion);
				//show a modal saying th time ran out and the answer
				view.timeUpScreen();
				//go to the break timer
				gameLogic.questionAnswerTimer();

			}

		} else if(gameLogic.answered === true){

			console.log("in decrement break")

			gameLogic.timerDisplay -= 1;

			$("#time-remaining-number").text(gameLogic.timerDisplay);

			if (gameLogic.timerDisplay === 0){
				
				gameLogic.timerDisplay = 10;
				gameLogic.currentQuestion += 1; //move to the next question
				gameLogic.answered = false;
				gameLogic.clockRunning = false;

				clearInterval(gameLogic.intervalQuestion);
				
				view.displayQuestionAnswers();//once the inbetween timer runs out grab a new question
				gameLogic.questionAnswerTimer();
				view.closeAllModals();
			}

		}
		
	},


//build an object as a dictionary of questions and answers
//need list of objects here

//random number to retrive question-->
// var numberMe = 1; -randomnumber here
//questionBank[1].question = "the question1" -----to call questions
//questionBank[1].answers[0] = "answer1" -----to call answers


//possibly don't need the correct key: value par, just put the correct answer first
//and the junk answers after, the question answer bank will remain unchanged so 
//if the button clicked's value doesnt equal answers[0], it will be wrong
//random sorting won't interfere with this

//question bank, this looks pretty good- happy with this
	questionBank: [

		{question: "the question0",
		answers: ["right","answer2","answer3","answer4"]},

		{question: "the question1",
		answers: ["right","answer2","answer3","answer4"]},

		{question: "the question2",
		answers: ["right","answer2","answer3","answer4"]},

		{question: "the question3",
		answers: ["right","answer2","answer3","answer4"]},

		{question:  "the question4",
		answers: ["right","answer2","answer3","answer4"]},

		{question: "the question5", 
		answers: ["right","answer2","answer3","answer4"]},

		{question: "the question6",
		answers: ["right","answer2","answer3","answer4"]},

		{question: "the question7",
		answers: ["right","answer2","answer3","answer4"]},

		{question: "the question8",
		answers: ["right","answer2","answer3","answer4"]}
	],

//gets an array to in random order to call answers from the question bank
//instructions don't specify random questions, but the answers should be mixed up

	currentQuestion: 0,

	correctGuesses: 0,
	wrongGuesses: 0,

	jumbleAnswers: function(){

		var answerDisplayOrder = [];

		var answerNumberList = [0,1,2,3];//i think im going to need to pick a number of this list randomly 
		
		do {
			var arrayLen = answerNumberList.length;
			var random = Math.floor((Math.random() * arrayLen)+0);

			answerDisplayOrder.push(answerNumberList[random]);
			answerNumberList.splice(answerNumberList.indexOf(answerNumberList[random]), 1);
		}

		while (answerNumberList.length > 1);

		answerDisplayOrder.push(answerNumberList[0]);

		return answerDisplayOrder;

	},	
	
}

var view = {
	//set up screen for correct answer
	//set up screen for incorrect answer
	//set up screen for time running out
	//needs to cover up main answer div maybe just use modal
	// jquery hide and show methods will probably work here
	//possibly other hidden divs that cover up the main one
	//could use position relative an z score to set up

	//method on modal from w3schools adapted to jquery


	//use to handle wrong, right, time out, game over
	//could probably use list of functions here but there were context problems
	//with he question bank
	correctAnswerScreen: function(){
		// if(gameLogic.isQuestion === false){
			$("#correct-answer-screen").css("display","block");
		// } else {
		// 	$("#correct-answer-screen").css("display","none");
		// }	
	},
	wrongAnswerScreen: function(){
		// if(gameLogic.isQuestion === false){
			$("#incorrect-answer-screen").css("display","block");
		// } else {
		// 	$("#incorrect-answer-screen").css("display","none");
		// }
		
	},
	timeUpScreen: function(){
		// if(gameLogic.isQuestion === false){
			$("#time-runout-screen").css("display","block");
		// } else {
		// 	$("#time-runout-screen").css("display","none");
		// }
		
	},
	gameOverScreen: function(){
		// if(gameLogic.isQuestion === false){
			$("#game-complete-screen").css("display","block");
		// } else {
		// 	$("#game-complete-screen").css("display","none");
		// }
		
	},

	closeAllModals: function(){
		$("#correct-answer-screen").css("display","none");
		$("#incorrect-answer-screen").css("display","none");
		$("#time-runout-screen").css("display","none");
		$("#game-complete-screen").css("display","none");
	},

	//pull questions randomly out of dictionary keys and answers out of the list values
	//apply to question html and buttons
	//gets random answers to go to buttons

	//this is functional, but the question variable needs editing
	displayQuestionAnswers: function (){

		var questionNumber = gameLogic.questionBank[gameLogic.currentQuestion];//gameLogic.currentQuestion
		

		$("#question-text").text(questionNumber.question)

		var randomAnswerArray = gameLogic.jumbleAnswers();

		$("#answer1").text(questionNumber.answers[randomAnswerArray[0]]);
		$("#answer2").text(questionNumber.answers[randomAnswerArray[1]]);
		$("#answer3").text(questionNumber.answers[randomAnswerArray[2]]);
		$("#answer4").text(questionNumber.answers[randomAnswerArray[3]]);

	}
}

//get user input from buttons
	//when question is answered correctly store +1 to correct answers
		//the correct answer will be the = to answer array index [0]
			//the button dislays are random
	//when question is answered incorrectly store +1 to incorrect answers
function getAnswer (){

	var rightAnswer = gameLogic.questionBank[gameLogic.currentQuestion].answers[0];//gameLogic.currentQuestion

	$(".answer-button").click(function(){

		var clickedAnswer = $(this).text();
		console.log(clickedAnswer);

		// gameLogic.isQuestion = false;//this should set the inbetween timer
		gameLogic.answered = true;

		if (clickedAnswer === rightAnswer){
			//correct answer screen and timer
			gameLogic.questionAnswerTimer();
			view.correctAnswerScreen();
		} else if(clickedAnswer !== rightAnswer){
			//wrong answer screen and timer;
			gameLogic.questionAnswerTimer();
			view.wrongAnswerScreen();
		}

	});

}


//set up screen for correct answer
//set up screen for incorrect answer
//set up screen for time running out
	//needs to cover up main answer div
	// jquery hide and show methods will probably work here
	//possibly other hidden divs that cover up the main one
	//could use position relative an z score to set up




//instructions for building advanced game
// * You'll create a trivia game that shows only one question until the player
// answers it or their time runs out.

// * If the player selects the correct answer, show a screen congratulating them
// for choosing the right option. After a few seconds, display the next question
// -- do this without user input.

// * The scenario is similar for wrong answers and time-outs.

//   * If the player runs out of time, tell the player that time's up and
// display the correct answer. Wait a few seconds, then show the next question.
//   * If the player chooses the wrong answer, tell the player they selected the
// wrong option and then display the correct answer. Wait a few seconds, then show
// the next question.

// * On the final screen, show the number of correct answers, incorrect answers,
// and an option to restart the game (without reloading the page).