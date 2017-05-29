var Game = function() {
    /* Game Settings */
    var settings = {};
    settings.level = 4;

    /* Interactions */
    var interactions = {};
    interactions.alphabet = "";
    interactions.enter = false;
    interactions.backspace = false;
    interactions.quickspace = false;

    /* Game Assets */
    var assets = [];
    var activeBlocks = [];
    var keyboard = new Keyboard(interactions, activeBlocks);
    assets[0] = keyboard;
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

    /* Set blocks to spawn at a random interval of 0.5-2.5 seconds,
    blocks are added to activeBlock array, which has a maximum cap
    of 10 blocks (10 blocks on screen max) */
    function spawnBlocks() {
        var randomInterval = Math.random() * ((2500 - 1000) + 1000);

        if (activeBlocks.length < 5) {
            activeBlocks.push(new Block(settings, activeBlocks));
        }
        setTimeout(spawnBlocks, randomInterval);
    };

    /* Render Function (called 60/s) */
    function render() {
        for (var i=0; i < assets.length; i++) {
        assets[0].render(interactions);
        }
    }

    /* Animation */
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
        render();
        frame++;
    })();

    setEvents();
    spawnBlocks();

}

var g = new Game();
