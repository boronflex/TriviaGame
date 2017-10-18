
$("#click-to-start").click(function(){
	$("#click-to-start").hide();
  	view.displayQuestionAnswers();
  	gameLogic.questionAnswerTimer();
});


var gameLogic = {
	
	timerDisplay: 10,

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

				handler.answerClicked = false;
				gameLogic.wrongGuesses += 1;
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

				handler.answerClicked = false;				
				gameLogic.timerDisplay = 10;
				gameLogic.currentQuestion += 1; //move to the next question
				gameLogic.answered = false;
				gameLogic.clockRunning = false;

				clearInterval(gameLogic.intervalQuestion);

				if (gameLogic.correctGuesses + gameLogic.wrongGuesses !==  gameLogic.questionBank.length){
					
					view.displayQuestionAnswers();//once the inbetween timer runs out grab a new question
					gameLogic.questionAnswerTimer();
					view.closeAllModals();

				} else {
					handler.answerClicked = true;
					clearInterval(gameLogic.intervalQuestion);
					gameLogic.clockRunning = false;
					view.gameOverScreen();	
				}
				
			}

		}
		
	},

	questionBank: [

		{question: "the question0",
		answers: ["right","answer2","answer3","answer4"]},

		{question: "the question1",
		answers: ["right","answer2","answer3","answer4"]}

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

	//should probably put all these modals on one method in a list
	//but i need to go ahead and get this out

	clickToStartScreen: function(){

		$("#click-to-start").css("display","block");
	},

	correctAnswerScreen: function(){
		$("#correct-answer-screen").css("display","block");
	},
	wrongAnswerScreen: function(){
		$("#incorrect-answer-screen").css("display","block");
		$(".show-correct-answer").text(gameLogic.questionBank[gameLogic.currentQuestion].answers[0])	
	},
	timeUpScreen: function(){
		$("#time-runout-screen").css("display","block");
		$(".show-correct-answer").text(gameLogic.questionBank[gameLogic.currentQuestion].answers[0])
	},
	gameOverScreen: function(){
		$("#game-complete-screen").css("display","block");
		$("#number-correct-answers").text("Correct Answers: " + gameLogic.correctGuesses)
		$("#number-wrong-answers").text("Wrong Answers: " + gameLogic.wrongGuesses)
	},

	closeAllModals: function(){
		$("#correct-answer-screen").css("display","none");
		$("#incorrect-answer-screen").css("display","none");
		$("#time-runout-screen").css("display","none");
		$("#game-complete-screen").css("display","none");
		$("#click-to-start").css("display","none");
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

var handler = {

	answerClicked: false,

	getAnswer: function  (){

		var rightAnswer = gameLogic.questionBank[gameLogic.currentQuestion].answers[0];//gameLogic.currentQuestion

		$(".answer-button").click(function(){

			if (handler.answerClicked === false){

				var clickedAnswer = $(this).text();
				console.log(clickedAnswer);
				
				//this should set the inbetween timer
				gameLogic.answered = true;
				handler.answerClicked = true;

				if (clickedAnswer === rightAnswer){
					//correct answer screen and timer
					gameLogic.correctGuesses += 1;
					gameLogic.timerDisplay = 5;
					gameLogic.questionAnswerTimer();
					view.correctAnswerScreen();
				} else if(clickedAnswer !== rightAnswer){
					//wrong answer screen and timer;
					gameLogic.wrongGuesses += 1;
					gameLogic.timerDisplay = 5;
					gameLogic.questionAnswerTimer();
					view.wrongAnswerScreen();
				}
			}

		});

	},

	restart: function(){

		$("#restart-game").click(function(){

			handler.answerClicked = false;
			gameLogic.currentQuestion = 0;
			gameLogic.correctGuesses = 0;
			gameLogic.wrongGuesses = 0;
			view.closeAllModals();
			view.clickToStartScreen();
			questionsLoaded = false

		})


	}
}

view.clickToStartScreen();
handler.getAnswer();
handler.restart();