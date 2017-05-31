var Tracker = function(settings) {

    var self = this;
    this.activeBlocks = [];
    this.matchingBlocks = [];
    this.lastMatches = [];
    this.health = 6;
    this.score = 0;

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
        if (self.score + 1 == 20) {
            self.score = 0;
            settings.level += 1;
        }
        self.score += 1;
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

    // function displayScore() {
    //     var score =
    // }

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
