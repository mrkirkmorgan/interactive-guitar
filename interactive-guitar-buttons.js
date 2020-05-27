var allNotes = [ 
  "E22", "E21", "E20", "E19", "E18", "E17", "E16", "E15", "E14", "E13", "E12", "E11", "E10", "E9", "E8", "E7", "E6", "E5", "E4", "E3", "E2", "E1", "E0",
  "A22", "A21", "A20", "A19", "A18", "A17", "A16", "A15", "A14", "A13", "A12", "A11", "A10", "A9", "A8", "A7", "A6", "A5", "A4", "A3", "A2", "A1", "A0",
  "D22", "D21", "D20", "D19", "D18", "D17", "D16", "D15", "D14", "D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "D1", "D0",
  "G22", "G21", "G20", "G19", "G18", "G17", "G16", "G15", "G14", "G13", "G12", "G11", "G10", "G9", "G8", "G7", "G6", "G5", "G4", "G3", "G2", "G1", "G0",
  "B22", "B21", "B20", "B19", "B18", "B17", "B16", "B15", "B14", "B13", "B12", "B11", "B10", "B9", "B8", "B7", "B6", "B5", "B4", "B3", "B2", "B1", "B0",
  "e22", "e21", "e20", "e19", "e18", "e17", "e16", "e15", "e14", "e13", "e12", "e11", "e10", "e9", "e8", "e7", "e6", "e5", "e4", "e3", "e2", "e1", "e0",
]

document.getElementById("guitar-backdrop").onload = function() {
  var canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;

  var ctx = canvas.getContext("2d");
  var img = document.getElementById("guitar-backdrop");
  ctx.drawImage(img, 0, 0);
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  var i;
  var note_coords = []
  
  for (i = 2764800; i < imgData.data.length - 2764800; i += 4) {
    if (imgData.data[i] == 255 && imgData.data[i+1] == 0 && imgData.data[i+2] == 0) {
      var coords = getCoordLocation(i);
      createInteractableNote(coords);
      note_coords.concat(coords);
      ctx.beginPath();
      ctx.arc(coords[0], coords[1], 9, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
}

function createInteractableNote(coordinates) {
  var note = document.createElement("input");
  note.type = "checkbox";
  note.id = allNotes.shift();
  note.style.left = coordinates[0] + "px"
  note.style.top = coordinates[1] + "px"

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(note);
}


function getCoordLocation(i) {
  var pixel = i / 4;
  var row = Math.floor(pixel / 1920);
  var column = pixel - (row * 1920);

  return [column, row];
}