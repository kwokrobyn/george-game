var Block = function(settings) {

    var setWord = function() {
        var listOfWords = getListOfWords();
        var wordsOfLength = listOfWords.filter(function(s) {
            return s.length === settings.level;
        });
        return wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)];
    }


    this.word = setWord();
    console.log(this.word);



}
