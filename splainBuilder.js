let Splain = require("@mog13/splain");

Splain.addEntry({
    greeting: ["hello", "howdy", "hey", "hi", "welcome", "greetings"],
    welcomeMsg: ["{{callToAction}} Capital Knowledge", "heres your first question", "lets begin", "lets start with"],
    callToAction: ["lets play", "its time for", "get ready for", "lets test your", "lets begin"],
    questionPrompt: ["{{question.enquiry question.capital question.in}} "],
    question: {
        enquiry: ["do you know ", "what is", "where is", "which city is", "which place is", "whats", "wheres"],
        capital: ["the capital", "the capital city"],
        in: ["in", "of"]
    },
    onWrong: {
        reply: ["{{onWrong.apology?2}} {{onWrong.pronoun}} {{onWrong.answerNoun}} is {{'sadly'?3}} {{onWrong.wrong}}."],
        apology: ["sorry", "I'm sorry", "unfortunately", "sadly", "unlucky,", "sadly", "regrettably"],
        pronoun: ["that", "your"],
        answerNoun: ["answer", "guess"],
        wrong: ["wrong", "incorrect", "not correct", "not right", "not the answer", "erroneous", "inaccurate", "mistaken", "false"],
        correctReveal: ["the correct answer", "the correct capital", "the correct place", "the answer you are looking for", "the answer", "the actual capital", "it"]

    },
    score: {
        end: ["you scored", "you answered", "your total is", "you got", "{{score.both}}"],
        active: ["{{score.both}}", "your on", "your up to", "that makes it"],
        both: ["your score is", "your total is"]
    },
    again: {
        question: ["would you like to", "care to", "want to"],
        action: ["play again", "try again", "give it another go", "try and beat your high score", "play another round", "play some more"]
    },
    correct: ["correct", "perfect", "exactly right"],
    congrats: ["well done", "amazing", "congratulations", "yes", "well played"]
});
