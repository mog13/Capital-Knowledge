let responseHelper = require("../responseHelper");
const capitalPairs = require("../questionData").countries;
let Splain = require("@mog13/splain");

module.exports = function handleAnswerRequest(intent, session, callback) {
    let speechOutput = "";
    let sessionAttributes = {};
    let gameInProgress = session.attributes && session.attributes.questions;
    //let userGaveUp = intent.name === "DontKnowIntent"; @todo implement a differnt path for not knowing

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes, responseHelper.buildSpeechletResponse("Capital Knowledge", speechOutput, speechOutput, false));
    } else {
        let gameQuestions = session.attributes.questions,
            correctAnswer = session.attributes.correctAnswer,
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex);

        //If they are correct
        if (intent.slots && intent.slots.Answer && intent.slots.Answer.value.toUpperCase() === correctAnswer.toUpperCase()) {
            currentScore++;
            speechOutput = Splain.process("{{{{congrats ','}}?2}} that is {{correct}}. ");
            if (currentQuestionIndex === capitalPairs.length - 1) {
                speechOutput += "You got every capital correct! congratulations and thanks for playing!";
                callback(session.attributes, responseHelper.buildSpeechletResponse("Capital Knowledge", speechOutput, "", true));
            }
            currentQuestionIndex += 1;

            let capitalPair = capitalPairs[gameQuestions[currentQuestionIndex]];
            let spokenQuestion =  Splain.process("{{questionPrompt}}")  + capitalPair.country;
            correctAnswer = capitalPair.capital;
            speechOutput +=  Splain.process(`{{score.active}}  ${currentScore.toString()}. `) + spokenQuestion;

            sessionAttributes = {
                "speechOutput": speechOutput,
                "repromptText": spokenQuestion,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswer": correctAnswer,
                "questions": gameQuestions,
                "score": currentScore,
            };
            callback(sessionAttributes, responseHelper.buildSpeechletResponse("Capital Knowledge", speechOutput, spokenQuestion, false));

        } else {
            //if they are wrong
            speechOutput += Splain.process(`{{onWrong.reply}} {{onWrong.correctReveal}} is ${correctAnswer}. `);
            speechOutput += Splain.process(`{{score.end}} ${session.attributes.score}. `);
            speechOutput += Splain.process(`{{again.question}} {{again.action}}?`);
            session.attributes.playAgain = true;
            callback(session.attributes, responseHelper.buildSpeechletResponse("Capital Knowledge",speechOutput, "", false));
        }









    }
};