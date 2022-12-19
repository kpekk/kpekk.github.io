
var numSelected = null;
var tileSelected = null;
let board = [[0,0,0,6,7,8,0,0,0],
            [0,0,0,1,9,".",0,0,0],
            [0,0,0,3,4,2,0,0,0],
            [0,0,0,".",6,1,0,0,0],
            [0,0,0,8,5,3,0,0,0], 
            [0,0,0,9,2,".",0,0,0],
            [9,6,1,5,3,7,2,8,"."],
            [2,8,".",4,1,".",6,3,5],
            [3,4,5,2,".",6,1,7,9]];

window.onload = function () {
    nokuLaud();
}

function nokuLaud () {
    // Digits 1-9
    for (let k = 1; k <= 9; k++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = k;
        number.innerText = k;
        number.addEventListener("click", selectNumber);
        number.classList.add("ruut");
        document.getElementById("digits").appendChild(number);
    }

    // board
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let ruut = document.createElement("div");


            ruut.id = i.toString()  + j.toString();

            // excluding "0"-s aka making the board shaped like a dick
            if (board[i][j] != 0) {
                ruut.innerText = board[i][j];
                if (board[i][j] == "."){
                    ruut.innerText = "";
                }

                //separator lines or whatever
                if (i == 2 || i == 5) {
                    ruut.style.borderBottom = "0.1vh solid gray";
                }
                if ((j == 2 || j == 5) && i > 5) {
                    ruut.style.borderRight = "0.1vh solid gray";
                }
                ruut.addEventListener("click", selectTile);
                
            } else {
                ruut.style.border = "0.1vh solid rgb(26, 25, 25)";
                ruut.style.backgroundColor = "rgb(26, 25, 25)";
            }
            
            ruut.classList.add("ruut");

            document.getElementById("board").append(ruut);
        }
    }
}

// distinguishing currently selected number
function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");

        // highlight digits on board
        for (let m = 0; m < 9; m ++){
            for (let n = 0; n < 9; n++){
                if (board[m][n] == numSelected.innerText ){
                    document.getElementById(m+""+n).classList.remove("number-selected");
                }
            }
        }
    }
    
    numSelected = this;
    numSelected.classList.add("number-selected");

    // remove highlight
    for (let m = 0; m < 9; m ++){
        for (let n = 0; n < 9; n++){
            if (board[m][n] == numSelected.innerText ){
                document.getElementById(m+""+n).classList.add("number-selected");
            }
        }
    }
}



// slam a number into a box
function selectTile() {
    if (numSelected) {
        
        // coords
        let i = parseInt(this.id[0]);
        let j = parseInt(this.id[1]);
        
        this.innerText = numSelected.id;
        board[i][j] = parseInt(numSelected.id); // also change the board variable (req. for easier validation)
        document.getElementById(i+""+j).classList.add("number-selected");
    }
}

/* board validation ----------------------------------------------------------------------------------------------------- */
function isValidRow(row_num) {
    let rowUnique = new Set(board[row_num]);

    if (row_num < 6) {
        return rowUnique.size == 4; // the invisible squares contain 0's, so one 0 is included in the set
    }
    return rowUnique.size == 9;
}

function isValidCol(col_num) {
    let colTemp = board.map(function(value,index) { return value[col_num]; });
    let colUnique = new Set(colTemp);

    if ([3,4,5].includes(col_num)) {
        return colUnique.size == 9;
    }
    return colUnique.size == 4;
}

function isValidCell(row_num, col_num){
    let vals = board[row_num].slice(col_num, col_num + 3);
    vals.push.apply(vals, board[row_num + 1].slice(col_num, col_num + 3));
    vals.push.apply(vals, board[row_num + 2].slice(col_num, col_num + 3));
    let valsSet = new Set(vals);
    return valsSet.size == 9;
}

function validateBoard() {
    let errorTxt = "";

    for (let i = 0; i < 9; i++){
        if (!isValidCol(i)){
            errorTxt = "kontrolli rida nr "+ (i+1);
        }
        if (!isValidCol(i)){
            errorTxt = "kontrolli veergu nr "+ (i+1);
        }
    }

    for (let k = 0; k < 9; k+=3){
        for (let l = 0; l < 9; l+=3){
            // blocks to NOT check:
            if (!(k == 0 && l == 0) && !(k == 3 && l == 0) && !(k == 0 && l == 6) && !(k == 3 && l == 6)){
                if (!isValidCell(k, l)){
                    errorTxt = "mingi 9-ne plokk on väär (a ma ei tea milline)";
                }
            }
        }
    }

    for (let m = 0; m < 9; m ++){
        for (let n = 0; n < 9; n++){
            if (board[m][n] == "." ){
                errorTxt = "ei jäta ruute tühjaks";
            }
        }
    }

    if (errorTxt == ""){
        document.getElementById("errorMsg").innerText = "omg õige, see pole vist essa sunoku mida lahendad";
        document.getElementById("errorMsg").style.color = "green";
    } else {
        document.getElementById("errorMsg").innerText = "!! " + errorTxt + " !!";
        document.getElementById("errorMsg").style.color = "red";
    }
}