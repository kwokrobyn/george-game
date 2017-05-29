/* Stores an array triggered by keydown events of letters typed by user */
var Keyboard = function(interactions, activeBlocks) {
    var current = [];
    var matchingBlocks = [];

    // add letter to current array
    function addToCurrent(interations) {
        if (interactions.alphabet !== "") {
            current.push(interactions.alphabet);
            interactions.alphabet = "";
            console.log(current);
        }
    }

    // delete last letter from current array
    function deleteFromCurrent(interactions) {
        if (interactions.backspace) {
            current.pop();
            interactions.backspace = false;
            console.log(current);
        }
    }

    // clear entire array
    function quickDelete(interactions) {
        if (interactions.quickspace) {
            current = [];
            interactions.quickspace = false;
            console.log(current);
        }
    }

    /* Store an array of matchingWords, which are words whose letters up to
    current.length match the letters typed into current (Graphics needed) */
    function matcher() {
        matchingBlocks = activeBlocks.filter(function(elem) {
            return elem.word.slice(0, current.length).toLowerCase() == current.join('').toLowerCase();
        });
        console.log(matchingBlocks);
    }

    // on spacebar, if current matches an active word, delete from activeBlocks
    // either way, keyboard is cleared
    function submitWord() {
        if (interactions.enter) {
            if (matchingBlocks.length != 0) {
                var word = current.join('').toUpperCase();
                for (var i=0; i<activeBlocks.length;i++) {
                    if (activeBlocks[i].word.toUpperCase() == word) {
                        activeBlocks.splice(i, 1);;
                    }
                }
            }
            current = [];
            interactions.enter = false;
        }
    }

    // simple testing display for block spawning and submitWords 
    function display() {
        var wordDisplay = document.querySelector('.words');
        var activeWords = [];
        for (var i=0;i<activeBlocks.length;i++) {
            activeWords.push(activeBlocks[i].word);
        }
        wordDisplay.innerHTML = activeWords.join(', ');

        var keyBoardDisplay = document.querySelector('.current');
        keyBoardDisplay.innerHTML = current.join(', ');
    }

    this.render = function(interactions) {
        addToCurrent(interactions);
        deleteFromCurrent(interactions);
        quickDelete(interactions);
        matcher();
        submitWord();
        display();
    }
}
