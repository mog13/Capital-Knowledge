let responseHelper = require("../responseHelper");
const capitalPairs = require("../questionData").countries;

function findCapital(country) {
    return capitalPairs.find(cap => cap.country.toUpperCase() === country.toUpperCase()).capital
}

function findCountry(capital) {
    console.log("looking for " + capital)
    return capitalPairs.find(cap => cap.capital.toUpperCase() === capital.toUpperCase()).country
}

module.exports = function getWelcomeResponse(intent, session, callback) {
    console.log("got to ask")
    let speechOutput = "",
        sessionAttributes;
    let gameInProgress = session.attributes && session.attributes.questions;
    if (gameInProgress) {
        speechOutput = `I cant tell you while your in the middle of a game!`;
        sessionAttributes = session.attributes;
    }
    else {
        if(intent.name === "askCapitalIntent") {
            console.log("got to ask capital")
            let capital = findCapital(intent.slots.country.value);
            console.log(capital)
            if (capital) {
                speechOutput = `the capital of ${intent.slots.country.value} is ${capital}`;
            }
            else {
                speechOutput = "sorry, i dont know";
            }
        }
        else{
            console.log("got to ask country")
            let country = findCountry(intent.slots.Answer.value);
            console.log(country)
            if (country) {
                speechOutput = `${intent.slots.Answer.value} is the capital of ${country}`;
            }
            else {
                speechOutput = "sorry, i dont know";
            }
        }

        sessionAttributes = {
            "speechOutput": speechOutput
        };
    }

    callback(sessionAttributes, responseHelper.buildSpeechletResponse("Capital knowledge", speechOutput, "", true));
};


