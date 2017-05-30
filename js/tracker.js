var Tracker = function() {
    this.activeBlocks = [];
    this.matchingBlocks = [];
    this.lastMatches = [];

    this.score = 3;

    this.addToActive = function(block) {
        this.activeBlocks.push(block);
    }

    this.render = function() {
    }
}
