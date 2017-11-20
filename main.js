const countries = require("./questionData").countries;
let responseHelper = require("./responseHelper");
let gameController = require("./gameController");


let welcomeResponse = require("./responses/welcome");



exports.handler = function(event, context) {
    try {

        if (event.request.type === "LaunchRequest") {
            welcomeResponse((sessionAttributes, speechletResponse) => {context.succeed(responseHelper.buildResponse(sessionAttributes, speechletResponse));});
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(responseHelper.buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};