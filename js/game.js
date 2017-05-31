 var Game = function() {
    /* Game Settings */
    var settings = {};
    settings.level = 4;
    settings.maxActiveBlocks = 7;

    /* Interactions */
    var interactions = {};
    interactions.alphabet = "";
    interactions.enter = false;
    interactions.backspace = false;
    interactions.quickspace = false;
    interactions.pause = false;

    /* Game Assets */
    var assets = [];
    var activeBlocks = [];
    var matchingBlocks = [];
    var tracker = new Tracker(settings);
    var keyboard = new Keyboard(interactions, tracker, settings);
    assets[0] = keyboard;
    assets[1] = tracker;
    var frame = 0;

    function setDisplay() {
        var container = document.querySelector('#game-container');
        container.style.display = 'block';

        // pause button is outside container
        var pause = document.querySelector('#pause');
        pause.style.display = 'block';
    }

    /* Add Event Listeners */
    function setEvents() {
        // if command and delete pressed simultaneously, clear entire keyboard
        var multipleKeyTracker = [0, 0];

        // click pause button to pause and play
        document.addEventListener('click', function(event) {
            if (event.target.id == 'pause') {
                if (interactions.pause == false) {
                    interactions.pause = true;
                    cancelRequestAnimFrame(request);
                }
                else if (interactions.pause == true) {
                    interactions.pause = false;
                    loop();
                }
            }
        })
        document.addEventListener('keydown', function(event) {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                interactions.alphabet = String.fromCharCode(event.keyCode);
                console.log(interactions.alphabet);
            }

            // backspace key
            if (event.keyCode == 8) {
                multipleKeyTracker[1] = 1;
                if (multipleKeyTracker[1] == 1 && multipleKeyTracker[0] == 1) {
                    interactions.quickspace = true;
                    multipleKeyTracker = [0,0];
                }
                else interactions.backspace = true;
            }
            // enter key
            if (event.keyCode == 32) interactions.enter = true;

            // command key
            if (event.keyCode == 91) multipleKeyTracker[0] = 1;

            // esc key
            if (event.keyCode == 27) {
                if (interactions.pause == false) {
                    interactions.pause = true;
                    cancelRequestAnimFrame(request);
                }
                else if (interactions.pause == true) {
                    interactions.pause = false;
                    loop();
                }
            }
        });

        document.addEventListener('keyup', function(event) {
            if (event.keyCode == 91) multipleKeyTracker[0] = 0;2
        });

        // add pause button animation
        document.addEventListener('mouseover', function(event) {
            if (event.target.id == 'pause') {
                event.target.style.cursor = 'pointer';
                event.target.className += ' animated rubberBand';
            }
        });

        document.addEventListener('mouseout', function(event) {
            if (event.target.id == 'pause') {
                event.target.className -= ' animated rubberBand';
            }
        });
    }

    /* Set blocks to spawn at a random interval of 0.5 and 1.5 seconds,
    blocks are added to activeBlock array, which has a maximum cap
    of 10 blocks (10 blocks on screen max) */
    function spawnBlocks() {
        var randomInterval = Math.random() * (2000 - 500) + 500;

        if (tracker.activeBlocks.length < settings.maxActiveBlocks && interactions.pause == false) {
            tracker.addToActive(new Block(settings, tracker));
        }
        setTimeout(spawnBlocks, randomInterval);
    };

    /* Render Function (called 60/s) */
    this.render = function() {
        for (var i=0; i < assets.length; i++) {
        assets[i].render(interactions);
        }
        for (var i=0; i < tracker.activeBlocks.length; i++) {
            tracker.activeBlocks[i].render();
        }
    }

    /* Animation */
    var self = this;
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function(callback){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    var request;
    var loop = function() {
        self.render();
        request = requestAnimFrame(loop);
        frame++;
        };

    loop();

    window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
    } )();

    if (interactions.pause) {
        console.log('hi')
        cancelRequestAnimFrame(request);
    }

    setDisplay();
    setEvents();
    spawnBlocks();

}
