$(document).click(function(){
  $("#clickanywhere").hide();
  questionAnswerTimer();
});

//TODO:

//get timer working counting down and displaying in the span set up html
	//will need a separate time or a method to use the same timer to count between questions
	//refer to stopwatch exercise to help set up the timer

var timerDisplay = 10;
var isQuestion = true;

var intervalQuestion;

function questionAnswerTimer (){

	intervalQuestion = setInterval(decrement, 1000);
	// console.log(timerDisplay);
	
}

function decrement(){

	//before decrement checks whether or not in a question or answer display mode
	//question is true - answer is false

	if (isQuestion === true){

		$("#correct-answer-screen").hide();
		$("incorrect-answer-screen").hide();
		$("time-runout-screen").show();

		timerDisplay -= 1;

		$("#time-remaining-number").text(timerDisplay);

		if (timerDisplay === 0){
			//once it counts down it switches the value of the timer to show
			//answer display and starts up timer again
			isQuestion = false;
			clearInterval(intervalQuestion);
			timerDisplay = 15;
			questionAnswerTimer();
			currentQuestion += 1; //move to the next question
		}

	} else if (isQuestion === false){

		timerDisplay -= 1;

		$("#time-remaining-number").text(timerDisplay);

		if (timerDisplay === 0){
			isQuestion = true;
			clearInterval(intervalQuestion);
			timerDisplay = 10;
			displayQuestionAnswers();//once the inbetween timer runs out grab a new question
			questionAnswerTimer();

		}

	}
	
}


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
var questionBank = [

	{question: "the question0",
	answers: ["answer1","answer2","answer3","answer4"]},

	{question: "the question1",
	answers: ["answer1","answer2","answer3","answer4"]},

	{question: "the question2",
	answers: ["answer1","answer2","answer3","answer4"]},

	{question: "the question3",
	answers: ["answer1","answer2","answer3","answer4"]},

	{question:  "the question4",
	answers: ["answer1","answer2","answer3","answer4"]},

	{question: "the question5", 
	answers: ["answer1","answer2","answer3","answer4"]},

	{question: "the question6",
	answers: ["answer1","answer2","answer3","answer4"]},

	{question: "the question7",
	answers: ["answer1","answer2","answer3","answer4"]},

	{question: "the question8",
	answers: ["answer1","answer2","answer3","answer4"]},
];

//gets an array to in random order to call answers from the question bank
//instructions don't specify random questions, but the answers should be mixed up

var currentQuestion = 0;
var questionNumber = questionBank[currentQuestion];
var rightAnswer = questionBank[currentQuestion].answers[0];

var correctGuesses = 0;
var wrongGuesses = 0;

function jumbleAnswers (){

	answerDisplayOrder = [];

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

}

//pull questions randomly out of dictionary keys and answers out of the list values
//apply to question html and buttons
	//gets random answers to go to buttons

//this is functional, but the question variable needs editing
function displayQuestionAnswers(){

	$("#question-text").text(questionNumber.question)

	var randomAnswerArray = jumbleAnswers();

	$("#answer1").text(questionNumber.answers[randomAnswerArray[0]]);
	$("#answer2").text(questionNumber.answers[randomAnswerArray[1]]);
	$("#answer3").text(questionNumber.answers[randomAnswerArray[2]]);
	$("#answer4").text(questionNumber.answers[randomAnswerArray[3]]);

}


//get user input from buttons
	//when question is answered correctly store +1 to correct answers
		//the correct answer will be the = to answer array index [0]
			//the button dislays are random
	//when question is answered incorrectly store +1 to incorrect answers
function getAnswer (){

	$(".answer-button").click(function(){
		var clickedAnswer = this.text();

		isQuestion = false;//this should set the inbetween timer

		if (clickedAnswer === rightAnswer){
			//correct answer screen and timer
			$("#correct-answer-screen").show();
		} else if(clickedAnswer === rightAnswer){
			//wrong answer screen and timer;
			$("incorrect-answer-screen").show();
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