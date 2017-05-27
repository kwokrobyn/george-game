var Keyboard = function(interactions) {
    var current = [];

    function addToCurrent(interations) {
        if (interactions.alphabet !== "") {
            current.push(interactions.alphabet);
            interactions.alphabet = "";
            console.log(current);
        }
    }

    function deleteFromCurrent(interactions) {
        if (interactions.backspace) {
            current.pop();
            interactions.backspace = false;
            console.log(current);
        }
    }

    function quickDelete(interactions) {
        if (interactions.quickspace) {
            current = [];
            interactions.quickspace = false;
            console.log(current);
        }
    }

    this.render = function(interactions) {
        addToCurrent(interactions);
        deleteFromCurrent(interactions);
        quickDelete(interactions);
    }
}
