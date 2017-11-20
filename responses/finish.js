let responseHelper = require("../responseHelper");

function handleFinishSessionRequest(intent, session, callback) {
    callback(session.attributes, responseHelper.buildSpeechletResponseWithoutCard("Thanks for playing capital knowledge.", "", true));
}

