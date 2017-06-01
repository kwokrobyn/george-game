var Start = function() {
    function startScreen() {
        document.addEventListener('mouseover', function(event) {
            if (event.target.classList.contains('start-button')) {
                event.target.className = 'active-start animated rubberBand';
                event.target.style.cursor = 'pointer';
            }
        });

        document.addEventListener('mouseout', function(event) {
            if (event.target.classList.contains('active-start')) {
                event.target.className = 'start-button';
            }
        });
    }

    function startGame() {
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('active-start')) {
                var startItems = document.querySelector('#start-container');
                startItems.style.display = 'none';
                var game = document.querySelector('#game-container');
                game.style.display= 'block';
                var display = document.querySelector('#title-card');
                display.innerHTML = '3';
                setTimeout(function() {
                    display.innerHTML = '2';
                }, 1000)
                setTimeout(function() {
                    display.innerHTML = '1';
                }, 2000)
                setTimeout(function() {
                    display.innerHTML = 'START!';
                    g = new Game();
                }, 3000)
                setTimeout(function() {
                    display.innerHTML = '';
                }, 4000)
            }
        })

        document.addEventListener('click', function(event) {
            if (event.target.className == 'text2') {
                var over = document.querySelector('#game-over');
                over.style.display = 'none';
                var game = document.querySelector('#game-container');
                game.style.display= 'block';
                var display = document.querySelector('#title-card');
                var board = document.querySelector('#game-board');
                board.innerHTML = '';
                display.innerHTML = '3';
                setTimeout(function() {
                    display.innerHTML = '2';
                }, 1000)
                setTimeout(function() {
                    display.innerHTML = '1';
                }, 2000)
                setTimeout(function() {
                    display.innerHTML = 'START!';
                    g = new Game();
                }, 3000)
                setTimeout(function() {
                    display.innerHTML = '';
                }, 4000)
            }
        });
    }

    setTimeout(function() {
        var img = document.querySelector('.george-img');
        img.className = 'george-img floating';
    }, 2000);

    var g;
    startScreen();
    startGame();
}

var s = new Start();
