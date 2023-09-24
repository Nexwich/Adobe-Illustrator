// Гена Панасин
// https://www.behance.net/dilnok
// Adobe Illustrator script

var doc = app.activeDocument;
var artboards = doc.artboards;

for (var i = 0; i < artboards.length; i += 1) {
	var artboard = artboards[i];
	var rect = artboard.artboardRect;
	
	for (var c = 0; c < rect.length; c += 1) rect[c] = Math.floor(rect[c]);

	artboard.artboardRect = rect;
}
