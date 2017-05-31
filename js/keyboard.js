/* Stores an array triggered by keydown events of letters typed by user */
var Keyboard = function(interactions, tracker, settings) {
    var current = [];

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
        tracker.matchingBlocks = tracker.activeBlocks.filter(function(elem) {
            return elem.word.slice(0, current.length).toLowerCase() == current.join('').toLowerCase();
        });
        if (tracker.matchingBlocks.length != 0 && tracker.matchingBlocks.length != tracker.activeBlocks.length) {
            tracker.lastMatches = tracker.matchingBlocks;
        };
    }

    // highlight matching words
    function matchHighlight() {
        tracker.activeBlocks.forEach(function(b) {
            var blockDisplay = document.querySelector('.'+b.word);
            var newDisplay = '<span>'+b.word+'</span>';
            blockDisplay.innerHTML = newDisplay;
        });
        tracker.matchingBlocks.forEach(function(b) {
            var blockDisplay = document.querySelector('.'+b.word);
            var hString = current.join('');
            var rString = b.word.split('').slice(current.length).join('');
            var newDisplay = '<span class="highlight">'+hString+'</span>'+rString;
            blockDisplay.innerHTML = newDisplay;
        });
    }

    // on spacebar, if current matches an active word, delete from activeBlocks
    // either way, keyboard is cleared
    function submitWord() {
        if (interactions.enter) {
            var clear = false;
            if (tracker.matchingBlocks.length != 0 && tracker.matchingBlocks.length != tracker.activeBlocks.length) {
                // word to check
                var word = current.join('').toUpperCase();
                for (var i=0; i<tracker.activeBlocks.length;i++) {
                    // clear successful, exact word found
                    if (tracker.activeBlocks[i].word.toUpperCase() == word) {
                        tracker.activeBlocks[i].deleteBlock();
                        clear = true;
                        tracker.increaseScore(settings);
                        tracker.activeBlocks.splice(i, 1);
                    }
                }
            }
            // speeds up last matching blocks if no match is made
            if (!clear) {
                tracker.lastMatches.forEach(function(match) {
                    match.speed += 1;
                });
        }
        // clear keyboard
        current = [];
        interactions.enter = false;
        }
    }

    // simple testing display for block spawning and submitWords
    function display() {
        // var wordDisplay = document.querySelector('.words');
        // var activeWords = [];
        // for (var i=0;i<tracker.activeBlocks.length;i++) {
        //     activeWords.push(tracker.activeBlocks[i].word);
        // }
        // wordDisplay.innerHTML = activeWords.join(', ');

        var keyBoardDisplay = document.querySelector('.current');
        keyBoardDisplay.innerHTML = current.join(' ');
    }

    this.render = function(interactions) {
        addToCurrent(interactions);
        deleteFromCurrent(interactions);
        quickDelete(interactions);
        matcher();
        matchHighlight();
        submitWord();
        display();
    }
}
