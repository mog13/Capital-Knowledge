let responseHelper = require("../responseHelper");
const capitalPairs = require("../questionData").countries;

function findCapital(country) {
    let ans =  capitalPairs.find(cap => cap.country.toUpperCase() === country.toUpperCase());
    if (ans) return ans.capital;
    return undefined;
}

function findCountry(capital) {
    let ans = capitalPairs.find(cap => cap.capital.toUpperCase() === capital.toUpperCase());
    if (ans) return ans.country;
    return undefined;
}

module.exports = function getWelcomeResponse(intent, session, callback) {
    let speechOutput = "",
        sessionAttributes;
    let gameInProgress = session.attributes && session.attributes.questions;
    if (gameInProgress) {
        speechOutput = `I cant tell you while your in the middle of a game!`;
        sessionAttributes = session.attributes;
    }
    else {
        if(intent.name === "askCapitalIntent") {
            let capital = findCapital(intent.slots.country.value);
            if (capital) {
                speechOutput = `the capital of ${intent.slots.country.value} is ${capital}`;
            }
            else {
                speechOutput = "sorry, i dont know";
            }
        }
        else{
            let country = findCountry(intent.slots.Answer.value);
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


