let gameController = require("../gameController");
let responseHelper = require("../responseHelper");
const capitalPairs = require("../questionData").countries;
let Splain = require("@mog13/splain");



module.exports = function getWelcomeResponse(callback) {
        let speechOutput = Splain.process("{{{{greeting '.'}}?2}} {{welcomeMsg}}. "),
        shouldEndSession = false,
        gameQuestions = gameController.populateGameQuestions(capitalPairs),
        currentQuestionIndex = 0,
        currentCapital = capitalPairs[gameQuestions[currentQuestionIndex]],
        spokenQuestion = Splain.process("{{questionPrompt}}")  + currentCapital.country,
        correctAnswer = currentCapital.capital;

    speechOutput += spokenQuestion;
    let sessionAttributes = {
        "speechOutput": spokenQuestion,
        "repromptText": spokenQuestion,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswer": correctAnswer,
        "questions": gameQuestions,
        "score": 0,
    };

    callback(sessionAttributes,
        responseHelper.buildSpeechletResponse("Capital knowledge", speechOutput, spokenQuestion, shouldEndSession));
};


