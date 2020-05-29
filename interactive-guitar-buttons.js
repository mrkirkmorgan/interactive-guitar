var allNotes = [ 
  ["E22", "E21", "E20", "E19", "E18", "E17", "E16", "E15", "E14", "E13", "E12", "E11", "E10", "E9", "E8", "E7", "E6", "E5", "E4", "E3", "E2", "E1", "E0"],
  ["A22", "A21", "A20", "A19", "A18", "A17", "A16", "A15", "A14", "A13", "A12", "A11", "A10", "A9", "A8", "A7", "A6", "A5", "A4", "A3", "A2", "A1", "A0"],
  ["D22", "D21", "D20", "D19", "D18", "D17", "D16", "D15", "D14", "D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "D1", "D0"],
  ["G22", "G21", "G20", "G19", "G18", "G17", "G16", "G15", "G14", "G13", "G12", "G11", "G10", "G9", "G8", "G7", "G6", "G5", "G4", "G3", "G2", "G1", "G0"],
  ["B22", "B21", "B20", "B19", "B18", "B17", "B16", "B15", "B14", "B13", "B12", "B11", "B10", "B9", "B8", "B7", "B6", "B5", "B4", "B3", "B2", "B1", "B0"],
  ["e22", "e21", "e20", "e19", "e18", "e17", "e16", "e15", "e14", "e13", "e12", "e11", "e10", "e9", "e8", "e7", "e6", "e5", "e4", "e3", "e2", "e1", "e0"]
];

var stringSelector = 0;

let chordNotes = [];

let threeNoteChords = {
  "A": [],
  "A#": [],

}

let chordDirectory = {
  2: [],
  3: [],
  4: []
}

let intervals = {
  "Pu": 0,
  "m2": 1,
  "M2": 2,
  "m3": 3,
  "M3": 4,
  "P4": 5,
  "+4": 6,
  "P5": 7,
  "m6": 8,
  "M6": 9,
  "m7": 10,
  "M7": 11,
  "Po": 12 
}

let chromaticScale = [
  "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"
];

let chordFormulas = {
  "Major": ["M3", "m3"],
  "Minor": ["m3", "M3"],
  "Diminished": ["m3", "m3"],
  "Augmented": ["M3", "M3"],
  "Suspended": ["P4, M2"]
}

let allChords = [
  [ 'E Suspended', [ 'A', 'B', 'E' ] ],
  [ 'A Diminished', [ 'A', 'C', 'D#' ] ],
  [ 'A Minor', [ 'A', 'C', 'E' ] ],
  [ 'F Major', [ 'A', 'C', 'F' ] ],
  [ 'F# Diminished', [ 'A', 'C', 'F#' ] ],
  [ 'A Major', [ 'A', 'C#', 'E' ] ],
  [ 'A Augmented', [ 'A', 'C#', 'F' ] ],
  [ 'C# Augmented', [ 'A', 'C#', 'F' ] ],
  [ 'F Augmented', [ 'A', 'C#', 'F' ] ],
  [ 'F# Minor', [ 'A', 'C#', 'F#' ] ],
  [ 'A Suspended', [ 'A', 'D', 'E' ] ],
  [ 'D Minor', [ 'A', 'D', 'F' ] ],
  [ 'D Major', [ 'A', 'D', 'F#' ] ],
  [ 'D Suspended', [ 'A', 'D', 'G' ] ],
  [ 'D# Diminished', [ 'A', 'D#', 'F#' ] ],
  [ 'F Suspended', [ 'A#', 'C', 'F' ] ],
  [ 'A# Diminished', [ 'A#', 'C#', 'E' ] ],
  [ 'A# Minor', [ 'A#', 'C#', 'F' ] ],
  [ 'F# Major', [ 'A#', 'C#', 'F#' ] ],
  [ 'G Diminished', [ 'A#', 'C#', 'G' ] ],
  [ 'A# Major', [ 'A#', 'D', 'F' ] ],
  [ 'A# Augmented', [ 'A#', 'D', 'F#' ] ],
  [ 'D Augmented', [ 'A#', 'D', 'F#' ] ],
  [ 'F# Augmented', [ 'A#', 'D', 'F#' ] ],
  [ 'G Minor', [ 'A#', 'D', 'G' ] ],
  [ 'A# Suspended', [ 'A#', 'D#', 'F' ] ],
  [ 'D# Minor', [ 'A#', 'D#', 'F#' ] ],
  [ 'D# Major', [ 'A#', 'D#', 'G' ] ],
  [ 'D# Suspended', [ 'A#', 'D#', 'G#' ] ],
  [ 'E Diminished', [ 'A#', 'E', 'G' ] ],
  [ 'F# Suspended', [ 'B', 'C#', 'F#' ] ],
  [ 'B Diminished', [ 'B', 'D', 'F' ] ],
  [ 'B Minor', [ 'B', 'D', 'F#' ] ],
  [ 'G Major', [ 'B', 'D', 'G' ] ],
  [ 'G# Diminished', [ 'B', 'D', 'G#' ] ],
  [ 'B Major', [ 'B', 'D#', 'F#' ] ],
  [ 'B Augmented', [ 'B', 'D#', 'G' ] ],
  [ 'D# Augmented', [ 'B', 'D#', 'G' ] ],
  [ 'G Augmented', [ 'B', 'D#', 'G' ] ],
  [ 'G# Minor', [ 'B', 'D#', 'G#' ] ],
  [ 'B Suspended', [ 'B', 'E', 'F#' ] ],
  [ 'E Minor', [ 'B', 'E', 'G' ] ],
  [ 'E Major', [ 'B', 'E', 'G#' ] ],
  [ 'F Diminished', [ 'B', 'F', 'G#' ] ],
  [ 'G Suspended', [ 'C', 'D', 'G' ] ],
  [ 'C Diminished', [ 'C', 'D#', 'F#' ] ],
  [ 'C Minor', [ 'C', 'D#', 'G' ] ],
  [ 'G# Major', [ 'C', 'D#', 'G#' ] ],
  [ 'C Major', [ 'C', 'E', 'G' ] ],
  [ 'C Augmented', [ 'C', 'E', 'G#' ] ],
  [ 'E Augmented', [ 'C', 'E', 'G#' ] ],
  [ 'G# Augmented', [ 'C', 'E', 'G#' ] ],
  [ 'C Suspended', [ 'C', 'F', 'G' ] ],
  [ 'F Minor', [ 'C', 'F', 'G#' ] ],
  [ 'G# Suspended', [ 'C#', 'D#', 'G#' ] ],
  [ 'C# Diminished', [ 'C#', 'E', 'G' ] ],
  [ 'C# Minor', [ 'C#', 'E', 'G#' ] ],
  [ 'C# Major', [ 'C#', 'F', 'G#' ] ],
  [ 'C# Suspended', [ 'C#', 'F#', 'G#' ] ],
  [ 'D Diminished', [ 'D', 'F', 'G#' ] ]
]

let directory = {
  3: { A: 0, 'A#': 15, B: 30, C: 44, 'C#': 54, D: 59 }
}


function locateChord(chord) {
  chord = sortChord(chord);
  try {
    let nextNote = chromaticScale[(chromaticScale.indexOf(chord[0]) + 1) % chromaticScale.length]
    let endIdx = directory[chord.length][nextNote]
    if (endIdx == undefined) {
      endIdx = directory[chord.length + 1]["A"];
  
      if (endIdx == undefined) {
        endIdx = allChords.length; 
      }
    }
    let startIdx = directory[chord.length][chord[0]];
  
    for (let i = startIdx; i < endIdx; i++) {
      if (arraysEqual(allChords[i][1], chord)) {
        return allChords[i][0];
      }
    }
  } catch {

  } finally {
    return "This chord is not a real chord.";
  }
}

function sortChord(chord) {
  for (var i = 1; i < chord.length; i++) {
    let note = chord[i];
    let prevNote = chord[i - 1];
    let adjust = 0;

    if (chromaticScale.indexOf(note) < chromaticScale.indexOf(prevNote)) {
      while (chromaticScale.indexOf(note) < chromaticScale.indexOf(prevNote)) {
        adjust++;
        prevNote = chord[i - 1 - adjust];
      }
      chord.splice(i, 1);
      chord.splice(i - adjust, 0, note);
    }
  }

  return chord;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

var selectedNotes = new Map();
selectedNotes.set("E", null);
selectedNotes.set("A", null);
selectedNotes.set("D", null);
selectedNotes.set("G", null);
selectedNotes.set("B", null);
selectedNotes.set("e", null);

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

  var guitar = document.getElementsByClassName("interactive-guitar")[0];
  guitar.appendChild(canvas);
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
      removeNote(id);
    } else {
      button.classList.add("selected");
      addNote(id);
    }

    let noteType = calculateNote();
    document.getElementsByClassName("chord")[0].innerHTML = "Chord: " + noteType;
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

function addNote(id) {
  var string = id.substring(0, 1);
  var fret = parseInt(id.substring(1));

  if(selectedNotes.get(string) == null) {
    selectedNotes.set(string, [fret]);
  } else {
    var array = selectedNotes.get(string);
    selectedNotes.set(string, array.concat(fret));
  }
}

function removeNote(id) {
  var string = id.substring(0, 1);
  var fret = parseInt(id.substring(1));

  var array = selectedNotes.get(string);
  var index = array.indexOf(fret);
  array.splice(index, 1);
  selectedNotes.set(string, array);

  if (selectedNotes.get(string).length == 0) {
    selectedNotes.set(string, null);
  }
}

function calculateNote() {
  var notes = []
  for (var str of selectedNotes.keys()) {
    var stringNotes = selectedNotes.get(str);

    if (stringNotes != null) {
      var startPoint = chromaticScale.indexOf(str.toUpperCase());
      var topFret = Math.max.apply(Math, stringNotes);
      var note = chromaticScale[(startPoint + topFret) % chromaticScale.length]

      if (!notes.includes(note)) {
        notes.push(note);
      }
    }
  }

  return locateChord(notes);
}