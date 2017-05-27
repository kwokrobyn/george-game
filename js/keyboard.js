var Keyboard = function(interactions) {
    var current = [];

    function addToCurrent(interations) {
        if (interactions.alphabet !== "") {
            current.push(interactions.alphabet);
            interactions.alphabet = "";
            console.log(current);
        }
    }

    this.render = function(interactions) {
        addToCurrent(interactions);
    }
}
