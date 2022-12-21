
let totalArt = 0;

// wait for html to load 
document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById("setHtmlBg").addEventListener('change', function() { setImgAsBackground("setHtmlBg","html"); } , true);
  });



function setImgAsBackground(fileElement, bgElement){
    var file = document.getElementById(fileElement).files[0];

    // hide file input when file has been uploaded
    document.getElementById(fileElement).style.display = "none";
    
    var reader = new FileReader();
    reader.onloadend = function(){
        document.getElementById(bgElement).style.backgroundImage = "url(" + reader.result + ")";    
        const img = new Image();

        // TODO aspect ratio
        img.src = reader.result;    
        img.onload = () => {
            console.log( aspectRatio( img.width, img.height, gcd(img.width, img.height) ) );
        };
    }

    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}


/* adding artwork ---------------------------------------------------------------------------------------------- */
function addArt () {
    totalArt += 1;

    // picture frame (TODO actual frame)
    var tag = document.createElement("div");
    tag.id = totalArt;
    tag.classList.add("draggable");

    // initial height and width
    tag.style.height = "100px";
    tag.style.width = "100px";

    var header = document.createElement("header");
    header.classList.add("dragzone");

    //tag.onload = dragElement(tag.id);
    //tag.addEventListener("load", dragElement(tag.id));

    dragElement(tag, header);
    
    
    // input for choosing file
    var fileButton = document.createElement("input");
    fileButton.type="file";
    fileButton.id = "file" + totalArt;
    header.appendChild(fileButton);
    fileButton.addEventListener('change', function() { setImgAsBackground(fileButton.id,tag.id); } , true);

    var content = document.getElementById("content");
    tag.appendChild(header);
    content.appendChild(tag);
    
    // make art resizeable
    tag.addEventListener('click', function init() {
        
        tag.removeEventListener('click', init, false);
        var resizer = document.createElement('div');
        resizer.className = 'resizer';
        tag.appendChild(resizer);
        resizer.custom = tag;
        resizer.addEventListener('mousedown', initDrag, false);
        
    }, false);

    // add button for removing artwork
    var controls = document.getElementById("controls");
    var tag2 = document.createElement("div");
    tag2.classList.add("removeArt");
    var removeButton = document.createElement("button");
    removeButton.classList.add("removeArtButton");
    removeButton.innerHTML = "x";
    removeButton.onclick = function () {
        // todo decrease all ids by 1?
        //totalArt -= 1;
        tag.remove();
        tag2.remove();
    }
    var pictureText = document.createTextNode("Pilt " + totalArt);
    tag2.appendChild(pictureText);
    tag2.appendChild(removeButton);
    controls.appendChild(tag2);
}

/* acpect ratio ------------------------------------------------------------------------------------------------ */
function aspectRatio(height, width, gcd){
    return [height/gcd, width/gcd];
}

// greatest common divisor, for calculating aspect ratio
//todo something for weird aspect ratio pics?
function gcd(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

/* make art draggable https://dev.to/shantanu_jana/how-to-create-a-draggable-div-in-javascript-iff ------------- */
const dragElement = (element, dragzone) => {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
//MouseUp occurs when the user releases the mouse button
    const dragMouseUp = () => {
      document.onmouseup = null;
//onmousemove attribute fires when the pointer is moving while it is over an element.
      document.onmousemove = null;

      element.classList.remove("drag");
    };

    const dragMouseMove = (event) => {

      event.preventDefault();
//clientX property returns the horizontal coordinate of the mouse pointer
      pos1 = pos3 - event.clientX;
//clientY property returns the vertical coordinate of the mouse pointer
      pos2 = pos4 - event.clientY;
      pos3 = event.clientX;
      pos4 = event.clientY;
//offsetTop property returns the top position relative to the parent
      element.style.top = `${element.offsetTop - pos2}px`;
      element.style.left = `${element.offsetLeft - pos1}px`;
    };

    const dragMouseDown = (event) => {
      event.preventDefault();

      pos3 = event.clientX;
      pos4 = event.clientY;

      element.classList.add("drag");

      document.onmouseup = dragMouseUp;
      document.onmousemove = dragMouseMove;
    };

    dragzone.onmousedown = dragMouseDown;
  };



function initDrag(e) {
    //console.log(this.custom)
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(this.custom.style.width, 10);
    startHeight = parseInt(this.custom.style.height, 10);
    this.addEventListener('mousemove', doDrag, false);
    this.addEventListener('mouseup', stopDrag, false);
}
 
 function doDrag(e) {
    this.custom.style.width = (startWidth + e.clientX - startX) + 'px';
    this.custom.style.height = (startHeight + e.clientY - startY) + 'px';
 }
 
 function stopDrag(e) {
    this.removeEventListener('mousemove', doDrag, false);    this.removeEventListener('mouseup', stopDrag, false);
 }
 
  