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

  return "This chord is not a real chord.";
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