var allNotes = [ 
  ["E22", "E21", "E20", "E19", "E18", "E17", "E16", "E15", "E14", "E13", "E12", "E11", "E10", "E9", "E8", "E7", "E6", "E5", "E4", "E3", "E2", "E1", "E0"],
  ["A22", "A21", "A20", "A19", "A18", "A17", "A16", "A15", "A14", "A13", "A12", "A11", "A10", "A9", "A8", "A7", "A6", "A5", "A4", "A3", "A2", "A1", "A0"],
  ["D22", "D21", "D20", "D19", "D18", "D17", "D16", "D15", "D14", "D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "D1", "D0"],
  ["G22", "G21", "G20", "G19", "G18", "G17", "G16", "G15", "G14", "G13", "G12", "G11", "G10", "G9", "G8", "G7", "G6", "G5", "G4", "G3", "G2", "G1", "G0"],
  ["B22", "B21", "B20", "B19", "B18", "B17", "B16", "B15", "B14", "B13", "B12", "B11", "B10", "B9", "B8", "B7", "B6", "B5", "B4", "B3", "B2", "B1", "B0"],
  ["e22", "e21", "e20", "e19", "e18", "e17", "e16", "e15", "e14", "e13", "e12", "e11", "e10", "e9", "e8", "e7", "e6", "e5", "e4", "e3", "e2", "e1", "e0"]
];

var stringSelector = 0;

var chromaticScale = [
  "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"
];

var selectedNotes = {"E": null, "A": null, "D": null, "G": null, "B": null, "e": null};

document.getElementById("guitar-backdrop").onload = function() {
  var canvas = document.createElement("canvas");
  canvas.width = 1805;
  canvas.height = 853;

  var ctx = canvas.getContext("2d");
  var img = document.getElementById("guitar-backdrop");
  ctx.drawImage(img, 0, 0);
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  var i;
  var note_coords = []
  var third = Math.floor(canvas.height / 3)
  var twoThird = third * 2;

  for (i = 0; i < canvas.width; i++) {
    for (j = third; j < twoThird; j++) {
      var value = (i + (j * canvas.width)) * 4;
      if (imgData.data[value] == 255 && imgData.data[value+1] == 0 && imgData.data[value+2] == 0) {
        var coords = [i, j];
        createInteractableNote(coords);
        note_coords.concat(coords);
      }
    }
  }
  
  for (i = 0; i < imgData.data.length; i += 4) {

  }

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
}

function createInteractableNote(coordinates) {

  var noteButton = document.createElement("span");
  var id = allNotes[stringSelector].shift();
  stringSelector = (stringSelector + 1) % 6;
  noteButton.id = id;
  noteButton.className = "noteButton";

  noteButton.style.left = coordinates[0] + "px";
  noteButton.style.top = coordinates[1] + "px";

  noteButton.innerHTML = getNote(id);

  noteButton.onclick = function(e) {
    var id = e.target.id
    var button = document.getElementById(id);

    if(button.classList.contains("selected")) {
      button.classList.remove("selected");
      //removeNote(id);
    } else {
      button.classList.add("selected");
      //addNote(id);
    }

  }

  var noteContainer = document.getElementsByClassName("notes")[0];
  noteContainer.appendChild(noteButton);
}

function getNote(id) {
  var string = id.substring(0, 1).toUpperCase();
  var fret = parseInt(id.substring(1));

  if(fret == 0) {
    return string;
  } else {
    var startPoint = chromaticScale.indexOf(string);
    var note = chromaticScale[(startPoint + fret) % chromaticScale.length]
    return note;
  }
}

function getCoordLocation(i) {
  var pixel = i / 4;
  var row = Math.floor(pixel / 1805);
  var column = pixel - (row * 1805);

  return [column, row];
}