
function populateGameQuestions(capitalPairs) {
    let currentIndex = capitalPairs.length,
        questionsList = [],
        temporaryValue, randomIndex;
    //make a new array i.e copy capital pairs into index list
    for (let i = 0; i < capitalPairs.length; i++) {
        questionsList.push(i);
    }
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = questionsList[currentIndex];
        questionsList[currentIndex] = questionsList[randomIndex];
        questionsList[randomIndex] = temporaryValue;
    }

    return questionsList;
}

module.exports = {populateGameQuestions};
