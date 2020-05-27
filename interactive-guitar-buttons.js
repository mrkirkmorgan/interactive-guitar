

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
  
  for (i = 0; i < imgData.data.length; i += 4) {
    if (imgData.data[i] == 255 && imgData.data[i+1] == 0 && imgData.data[i+2] == 0) {
      var coords = getCoordLocation(i);
      note_coords.concat(coords);
      ctx.beginPath();
      ctx.arc(coords[0], coords[1], 9, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
}




function getCoordLocation(i) {
  var pixel = i / 4;
  var row = Math.floor(pixel / 1920);
  var column = pixel - (row * 1920);

  return [column, row];
}