var Tracker = function() {

    var self = this;
    this.activeBlocks = [];
    this.matchingBlocks = [];
    this.lastMatches = [];
    this.health = 5;

    function displayHealth() {
        var heart = '<div class="heart"></div>';
        var healthBar = document.querySelector('#health');
        var healthContent = "";
        for (var i=0; i<self.health;i++) {
            healthContent += heart;
        }
        healthBar.innerHTML = healthContent;
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
    }
}
