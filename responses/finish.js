let responseHelper = require("../responseHelper");

module.exports = function handleFinishSessionRequest(intent, session, callback) {
    callback(session.attributes, responseHelper.buildSpeechletResponseWithoutCard("Thanks for playing capital knowledge.", "", true));
};

