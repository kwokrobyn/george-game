var Tracker = function(settings) {

    var self = this;
    this.activeBlocks = [];
    this.matchingBlocks = [];
    this.lastMatches = [];
    this.health = 1;
    this.score = 0;
    this.villageCount = 1;

    function displayHealth() {
        var heart = '<div class="heart"></div>';
        var healthBar = document.querySelector('#health');
        var healthContent = "";
        for (var i=0; i<self.health;i++) {
            healthContent += heart;
        }
        healthBar.innerHTML = healthContent;
    }

    this.increaseScore = function(settings) {
        if (self.score + 1 == 15) {
            self.score = 0;
            settings.level += 1;
            settings.minSpeed += 0.4;
            settings.maxSpeed += 0.4;
            this.health = 5;
            var display = document.querySelector('#title-card');
            display.innerHTML = 'Level ' + (settings.level-3);
            setTimeout(function() {
                display.innerHTML = '';
            }, 3000)
        }
        self.score += 1;
        if (self.score % 3 === 0 && self.score > 1) {
            var item = document.querySelector('.v'+ self.villageCount);
            item.className += ' hatch';
            self.villageCount++;
        }
    }

    function displayScore() {
        var storeBar = document.querySelector('#store-bar');
        var storeBlock = '<div class="store-block"></div>';
        var storeContent = "";
        for (var i=0;i<self.score;i++) {
            storeContent += storeBlock;
        }
        storeBar.innerHTML = storeContent;
    }

    this.getActiveWords = function() {
        var ret = [];
        this.activeBlocks.forEach(function(block) {
            ret.push(block.word);
        })
        return ret;
    }

    this.addToActive = function(block) {
        this.activeBlocks.push(block);
    }

    this.render = function() {
        displayHealth();
        displayScore();
    }
}
