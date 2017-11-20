let responseHelper = require("../responseHelper");
let welcomeResponse = require("./welcome");

module.exports = function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        welcomeResponse(callback);
    } else {
        callback(session.attributes,
            responseHelper.buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}