let welcomeResponse = require("./welcome"),
    finishResponse = require("./finish"),
    repeatResponse = require("./repeat"),
    helpResponse = require("./help"),
    answerResponse = require("./answer");


module.exports = function onIntent(intentRequest, session, callback) {

    let intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            finishResponse(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            repeatResponse(intent, session, callback);
        }
    }
    if (session.attributes && session.attributes.playAgain) {
        delete session.attributes.playAgain;
        if ("AMAZON.NoIntent" === intentName) {
            finishResponse(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            welcomeResponse(callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        answerResponse(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        answerResponse(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        answerResponse(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        answerResponse(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        answerResponse(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        welcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        repeatResponse(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        helpResponse(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        finishResponse(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        finishResponse(intent, session, callback);
    }

};