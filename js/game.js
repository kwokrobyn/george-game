var Game = function() {
    /* Game Settings */
    var settings = {};
    settings.level = 5;

    /* Interactions */
    var interactions = {};
    interactions.alphabet = "";
    interactions.enter = false;
    interactions.backspace = false;
    interactions.quickspace = false;

    /* Game Assets */
    var assets = [];
    var block = new Block(settings);
    var keyboard = new Keyboard(interactions);
    assets[0] = block;
    assets[1] = keyboard;
    var frame = 0;


    // /* Render Function (called 60/s) */
    function render() {
        for (var i=0; i < assets.length; i++) {
        assets[1].render(interactions);
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
    })();

    /* Add Event Listeners */
    function setEvents() {
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
                else {
                    interactions.backspace = true;
                }
            }

            if (event.keyCode == 32) {
                interactions.enter = true;
            }

            if (event.keyCode == 91) {
                multipleKeyTracker[0] = 1;
            }

        });

        document.addEventListener('keyup', function(event) {
            if (event.keyCode == 91) {
                multipleKeyTracker[0] = 0;
            }
        });
    }


    setEvents();

}

var g = new Game();
