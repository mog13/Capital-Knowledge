let gameController = require("./gameController");
let responseHelper = require("../responseHelper");

function generateQuestion(capitalPair) {
    return "What is the capital of " + capitalPair.country;
}

module.exports = function getWelcomeResponse(callback, capitalPairs) {
        let speechOutput = "Lets play capital knowledge!",
        shouldEndSession = false,
        gameQuestions = gameController.populateGameQuestions(),
        currentQuestionIndex = 0,
        currentCapital = capitalPairs[gameQuestions[currentQuestionIndex]],
        spokenQuestion = generateQuestion(currentCapital),
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


