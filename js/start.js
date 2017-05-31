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
                var g = new Game();

            }
        })
    }

    setTimeout(function() {
        var img = document.querySelector('.george-img');
        img.className = 'george-img floating';
    }, 2000);

    startScreen();
    startGame();
}

var s = new Start();
