let responseHelper = require("../responseHelper");
let welcomeResponse = require("./welcome");

module.exports = function handleRepeatRequest(intent, session, callback) {
    if (!session.attributes || !session.attributes.speechOutput) {
        welcomeResponse(callback);
    } else {
        callback(session.attributes,
            responseHelper.buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}