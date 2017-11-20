let responseHelper = require("../responseHelper");
const capitalPairs = require("../questionData").countries;

function generateQuestion(capitalPair) {
    return "What is the capital of " + capitalPair.country;
}

module.exports = function handleAnswerRequest(intent, session, callback) {
    let speechOutput = "";
    let sessionAttributes = {};
    let gameInProgress = session.attributes && session.attributes.questions;
    let userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            responseHelper.buildSpeechletResponse("Capital Knowledge", speechOutput, speechOutput, false));
    } else {
        let gameQuestions = session.attributes.questions,
            correctAnswer = session.attributes.correctAnswer,
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            speechOutputAnalysis = "";

        //If they are correct
        if (intent.slots && intent.slots.Answer && intent.slots.Answer.value.toUpperCase() == correctAnswer.toUpperCase()) {
            currentScore++;
            speechOutputAnalysis = "correct. ";

            if (currentQuestionIndex == capitalPairs.length - 1) {
                speechOutput += speechOutputAnalysis + "You got every capital correct! congratulations and thanks for playing!";
                callback(session.attributes,
                    responseHelper.buildSpeechletResponse("Capital Knowledge", speechOutput, "", true));
            }

        } else {
            //if they are wrong
            speechOutputAnalysis += "Sorry the correct answer is " + correctAnswer + ". ";
            speechOutputAnalysis += "You scored "+ session.attributes.score + ". ";
            speechOutputAnalysis += "Would you like to play again?";
            session.attributes.playAgain = true;
            callback(session.attributes,
                responseHelper.buildSpeechletResponse("Capital Knowledge",speechOutputAnalysis, "", false));
        }

        currentQuestionIndex += 1;
        let spokenQuestion = generateQuestion(capitalPairs[gameQuestions[currentQuestionIndex]]);
        correctAnswer = capitalPairs[gameQuestions[currentQuestionIndex]].capital;
        let repromptText = spokenQuestion;

        speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

        sessionAttributes = {
            "speechOutput": repromptText,
            "repromptText": repromptText,
            "currentQuestionIndex": currentQuestionIndex,
            "correctAnswer": correctAnswer,
            "questions": gameQuestions,
            "score": currentScore,
        };
        callback(sessionAttributes,
            responseHelper.buildSpeechletResponse("Capital Knowledge", speechOutput, repromptText, false));

    }
}