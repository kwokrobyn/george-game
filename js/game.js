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

    /* Game Assets */
    var assets = [];
    var activeBlocks = [];
    var matchingBlocks = [];
    var tracker = new Tracker();
    var keyboard = new Keyboard(interactions, tracker);
    assets[0] = keyboard;
    assets[1] = tracker;
    var frame = 0;

    /* Add Event Listeners */
    function setEvents() {
        // if command and delete pressed simultaneously, clear entire keyboard
        var multipleKeyTracker = [0, 0];
        document.addEventListener('keydown', function(event) {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                interactions.alphabet = String.fromCharCode(event.keyCode);
                console.log(interactions.alphabet);
            }

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
        });

        document.addEventListener('keyup', function(event) {
            if (event.keyCode == 91) multipleKeyTracker[0] = 0;2
        });
    }

    /* Set blocks to spawn at a random interval of 2-3 seconds,
    blocks are added to activeBlock array, which has a maximum cap
    of 10 blocks (10 blocks on screen max) */
    function spawnBlocks() {
        var randomInterval = Math.random() * ((3000 - 2000) + 2000);

        if (tracker.activeBlocks.length < settings.maxActiveBlocks) {
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

    (function loop() {
        requestAnimFrame(loop);
        self.render();
        frame++;
    })();

    setEvents();
    spawnBlocks();

}

var g = new Game();
