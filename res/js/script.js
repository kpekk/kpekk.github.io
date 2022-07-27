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

// igas plokis saab valida, mitu n-küljelist täringut valida
// nii saab valida nt 7 6-küljelist + 6 7-küljelist + ...
function addDice() {
    var tag = document.createElement("p")

    //täringu külgede arv
    var sidesText = document.createTextNode("Külgede arv: ");
    tag.appendChild(sidesText);

    var sides = document.createElement("input");
    sides.setAttribute("id", "sides");
    sides.setAttribute("type", "number");
    tag.appendChild(sides);

    //täringute arv
    var amountText = document.createTextNode("Viskeid: ");
    tag.appendChild(amountText);

    var amount = document.createElement("input");
    amount.setAttribute("id", "amount");
    amount.setAttribute("type", "number");
    tag.appendChild(amount);


    //advantage
    var advantageText = document.createTextNode("advantage: ");
    tag.appendChild(advantageText);
    var advantage = document.createElement("INPUT");
    advantage.setAttribute("id", "advantage");
    advantage.setAttribute("type", "checkbox");
    tag.appendChild(advantage);

    //disadvantage
    var disadvantageText = document.createTextNode("disadvantage: ");
    tag.appendChild(disadvantageText);
    var disadvantage = document.createElement("INPUT");
    disadvantage.setAttribute("id", "disadvantage");
    disadvantage.setAttribute("type", "checkbox");
    tag.appendChild(disadvantage);

    //modifier
    var modifierText = document.createTextNode("Modifier: ");
    tag.appendChild(modifierText);

    var modifier = document.createElement("input");
    modifier.setAttribute("id", "modifier");
    modifier.setAttribute("type", "number");
    tag.appendChild(modifier);

    // bloki kustutamise nupp
    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "X";
    deleteBtn.onclick = function () {
        tag.remove();
    }
    tag.appendChild(deleteBtn);


    // lisame elemendi div-i "test"
    var element = document.getElementById("dices");
    element.appendChild(tag);
}

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function calculateThrows() {

    // eemaldame eelnevad veeretamised
    deleteAllChildren("output")

    let dices = document.getElementById("dices").childNodes;

    var total = 0;
    var diceTotal = 0;

    // iga täringu kohta:
    dices.forEach(dice => {

        // lähtsestame täringu kogusumma
        diceTotal = 0;

        // täringu küljed
        var sides = dice.querySelector("#sides").value;

        // visete arv
        var throws = dice.querySelector("#amount").value;

        // modifier
        var modifier = dice.querySelector("#modifier").value;

        // advantage
        var advantage = dice.querySelector("#advantage");

        // disadvantage
        var disadvantage = dice.querySelector("#disadvantage");

        // visete värv (eristamiseks)
        var diceColor = randomColor();

        //teeme visked:
        if (sides && throws) {
            for (let i = 0; i < throws; i++) {
                //text += cars[i] + "<br>";

                var tag = document.createElement("p");
                tag.style.background = diceColor;
                tag.setAttribute("class","throw");


                var dmg = Math.floor(Math.random() * (sides) + 1);
                // advantage
                if (advantage.checked) {
                    dmg = Math.max(Math.floor(Math.random() * (sides) + 1), Math.floor(Math.random() * (sides) + 1));
                };

                // disadvantage
                if (disadvantage.checked) {
                    dmg = Math.min(Math.floor(Math.random() * (sides) + 1), Math.floor(Math.random() * (sides) + 1));
                };

                // dmg +- modifier
                if (modifier) {
                    dmg += +modifier;
                };

                total += +dmg;
                diceTotal += +dmg;

                var text = document.createTextNode("dmg: " + dmg);
                tag.appendChild(text);
                var element = document.getElementById("output");
                element.appendChild(tag);
            }

            // dice total
            var tag = document.createElement("p");
            var text = document.createTextNode("dice dmg: " + diceTotal);
            tag.appendChild(text);
            tag.style.background = "gray";
            var element = document.getElementById("output");
            tag.setAttribute("class","total");
            element.appendChild(tag);
        }
    })

    var tag = document.createElement("p");
    var text = document.createTextNode("total dmg: " + total);
    tag.appendChild(text);
    tag.style.background = "gray";
    var element = document.getElementById("output");
    tag.setAttribute("class","total");
    element.appendChild(tag);

    //todo viske värv punane kui critical hit (20 dicel 20)
    // ühe viske kast väiksemaks
    // armorclass
}