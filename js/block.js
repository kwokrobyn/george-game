var Block = function(settings, tracker) {

    var self = this;
    this.speed = 1;
    this.word = setWord();
    displayBlock(this.word);


    function setWord() {
        var listOfWords = getListOfWords();
        var wordsOfLength = listOfWords.filter(function(s) {
            return (s.length === settings.level);
        });
        return wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)];
    }

    function displayBlock(word) {

        var blockContent = '<div class="block '+word+'"><span>'+word+'</span></div>';
        var gameBoard = document.querySelector('#game-board');
        gameBoard.innerHTML += blockContent;


        var blockDisplay = document.querySelector('.'+word);
        blockDisplay.style.top = "-45px";

        // random x position
        var randomX = Math.floor(Math.random() * 475);
        blockDisplay.style.left = randomX+'px';
    }


    function gravity(word) {
        var block = document.querySelectorAll('.'+word);
        for (var i=0;i<block.length;i++) {
            block[i].style.top = parseInt(block[i].style.top)+self.speed+'px';
        }
    }

    function getIndex() {
        var blockIndex = -1;
        for (var i=0; i<tracker.activeBlocks.length;i++) {
            if (tracker.activeBlocks[i].word == self.word) {
                blockIndex = i;
            }
        }
        return blockIndex;
    }

    this.deleteBlock = function() {
        var blockToClear = document.querySelector('.'+this.word);
        blockToClear.parentNode.removeChild(blockToClear);
    }

    function death() {
        var block = document.querySelector('.'+self.word);
        if (block.style.top == "520px") {
            self.deleteBlock();

            var blockIndex = getIndex();
            tracker.activeBlocks.splice(blockIndex, 1);
        }
    }

    this.render = function() {
        gravity(this.word);
        death();
    }



}
