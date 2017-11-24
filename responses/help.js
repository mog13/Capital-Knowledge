let responseHelper = require("../responseHelper");

module.exports = function handleGetHelpRequest(intent, session, callback) {
    // Set a flag to track that we're in the Help state.
    if (session.attributes) {
        session.attributes.userPromptedToContinue = true;
    } else {
        session.attributes = {
            userPromptedToContinue: true
        };
    }

    let speechOutput = "To start a new game at any time, say, start new game. " +
        "To repeat the last question, say, repeat. " +
        "Would you like to keep playing?",
        repromptText = "Would you like to keep playing?";
    callback(session.attributes,
        responseHelper.buildSpeechletResponseWithoutCard(speechOutput, repromptText, false));
};
