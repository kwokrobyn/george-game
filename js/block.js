var Block = function(settings, tracker) {

    var self = this;
    // randomised speed between 0.5 and 1.7
    this.speed = Math.random() * (1.2-0.5) + 0.5;
    this.word = setWord();
    displayBlock(this.word);


    function setWord() {
        var listOfWords = getListOfWords();
        var avoidWords = tracker.getActiveWords();
        var wordsOfLength = listOfWords.filter(function(s) {
            return (s.length === settings.level && avoidWords.indexOf(s) == -1);
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
            block[i].style.top = parseFloat(block[i].style.top)+self.speed+'px';
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
        if (parseFloat(block.style.top) >= 520) {
            self.deleteBlock();

            var blockIndex = getIndex();
            tracker.activeBlocks.splice(blockIndex, 1);
            tracker.health -= 1;
        }
    }

    this.render = function() {
        gravity(this.word);
        death();
    }



}
