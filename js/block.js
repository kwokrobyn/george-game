var Block = function(settings) {

    function setWord() {
        var listOfWords = getListOfWords();
        var wordsOfLength = listOfWords.filter(function(s) {
            return s.length === settings.level;
        });
        return wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)];
    }

    function displayBlock(word) {
        var blockContent = '<div class="block"><span>'+word+'</span></div>';
        var gameBoard = document.querySelector('#game-board');
        gameBoard.innerHTML += blockContent;
    }

    //function deleteWord



    this.word = setWord();
    displayBlock(this.word);
    console.log(this.word);



}
