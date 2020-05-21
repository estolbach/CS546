function createMetrics(text) {
    if(typeof text !== 'string')
        throw "Text must be a string";

    var lowerText = text.toLowerCase();

    var totalNonLetters = 0;
    var totalLetters = 0;
    var totalWords = 0;
    var totalVowels = 0;
    var totalConsonants = 0;
    var uniqueWords = 0;
    var longWords = 0;
    var averageWordLength = 0;
    var wordOccurrences = {};


    totalLetters = lowerText.match(/[a-z]/g).length;
    totalNonLetters = lowerText.match(/[^a-z]/g).length;
    //var vowels = /[aeiou]/g;
    totalVowels = lowerText.match(/[aeiou]/g).length;
    totalConsonants = totalLetters - totalVowels;
    var temp = lowerText.replace(/[^a-z]/g, " ");
    var words = temp.split(" ");
    totalWords = words.length;
    for(var i = 0; i < totalWords; i++){
        if(words[i].length > 5) {
            longWords++;
        }
        if(words[i] in wordOccurrences){
            wordOccurrences[words[i]]++;
        }else {
            wordOccurrences[words[i]] = 1;
        }
    }

    uniqueWords = Object.keys(wordOccurrences).length;
    averageWordLength = totalLetters / totalWords;

    return {
        "totalLetters": totalLetters,
        "totalNonLetters": totalNonLetters,
        "totalWords": totalWords,
        "totalVowels": totalVowels,
        "totalConsonants": totalConsonants,
        "uniqueWords": uniqueWords,
        "longWords": longWords,
        "averageWordLength": averageWordLength,
        "wordOccurrences": wordOccurrences
    }
}

module.exports = {
    createMetrics
};