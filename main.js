
let responseHelper = require("./responseHelper");

let welcomeResponse = require("./responses/welcome");
let intentHandler = require("./responses/intentHandler");
require("./splainBuilder");

exports.handler = function(event, context) {
    try {

        if (event.request.type === "LaunchRequest") {
            welcomeResponse((sessionAttributes, speechletResponse) => {context.succeed(responseHelper.buildResponse(sessionAttributes, speechletResponse));});
        } else if (event.request.type === "IntentRequest") {
            intentHandler(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(responseHelper.buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};