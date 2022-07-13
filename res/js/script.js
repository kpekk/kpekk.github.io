// function to delete all children of an element
function deleteAllChildren(id) {
    var e = document.getElementById(id);

    //e.firstElementChild can be used.
    var child = e.firstElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function calculateThrows() {

    // clear previous throws
    deleteAllChildren("output")

    // how many sides do the dice have
    var sides = document.getElementById("sides").value

    // amount of throws
    var throws = document.getElementById("throws").value

    if (sides && throws) {
        for (let i = 0; i < throws; i++) {
            //text += cars[i] + "<br>";

            var tag = document.createElement("p")
            var dmg = Math.floor(Math.random() * (sides) + 1)
            var text = document.createTextNode("dmg: " + dmg);
            tag.appendChild(text);
            var element = document.getElementById("output");
            element.appendChild(tag);
        }
    }
}