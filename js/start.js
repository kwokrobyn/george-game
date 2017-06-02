var Start = function() {
    var self = this;
    this.playSound = function(audio) {
        if(audio.duration > 0 && !audio.paused){

            //already playing
            audio.pause();
            audio.currentTime = 0;
            audio.play();

        }else{

            //not playing
            audio.play();

        }
    }
    function startScreen() {
        var audio = document.getElementsByTagName("audio")[6];
        if(audio.duration > 0 && !audio.paused){

            //already playing
            audio.pause();
            audio.currentTime = 0;
            audio.play();

        }else{

            //not playing
            audio.play();

        }

        document.addEventListener('mouseover', function(event) {
            if (event.target.classList.contains('start-button')) {
                var audio = document.getElementsByTagName("audio")[8];
                self.playSound(audio);
                event.target.className = 'active-start animated rubberBand';
                event.target.style.cursor = 'pointer';
            }
            if (event.target.classList.contains('george-img')) {
                document.querySelector('#instructions').style.visibility = 'visible';
            }
        });

        document.addEventListener('mouseout', function(event) {
            if (event.target.classList.contains('active-start')) {
                event.target.className = 'start-button';
            }
            if (event.target.classList.contains('george-img')) {
                document.querySelector('#instructions').style.visibility = 'hidden';
            }
        });
    }

    function startGame() {
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('active-start')) {
                var audio = document.getElementsByTagName("audio")[6];
                audio.pause();
                audio.currentTime = 0;
                var startItems = document.querySelector('#start-container');
                startItems.style.display = 'none';
                var game = document.querySelector('#game-container');
                game.style.display= 'block';
                var display = document.querySelector('#title-card');
                display.innerHTML = '3';
                var audio = document.getElementsByTagName("audio")[9];
                self.playSound(audio);
                for (var i=1; i<19;i++) {
                    var item = document.querySelector('.v'+ i);
                    item.classList.remove('hatch');
                }
                setTimeout(function() {
                    display.innerHTML = '2';
                }, 1000)
                setTimeout(function() {
                    display.innerHTML = '1';
                }, 2000)
                setTimeout(function() {
                    display.innerHTML = 'START!';
                    g = new Game();
                    var audio = document.getElementsByTagName("audio")[7];
                    audio.loop = true;
                    self.playSound(audio);
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
                var audio = document.getElementsByTagName("audio")[9];
                self.playSound(audio);
                for (var i=1; i<19;i++) {
                    var item = document.querySelector('.v'+ i);
                    item.classList.remove('hatch');
                }
                setTimeout(function() {
                    display.innerHTML = '2';
                }, 1000)
                setTimeout(function() {
                    display.innerHTML = '1';
                }, 2000)
                setTimeout(function() {
                    display.innerHTML = 'START!';
                    g = new Game();
                    var audio = document.getElementsByTagName("audio")[7];
                    audio.loop = true;
                    self.playSound(audio);
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
