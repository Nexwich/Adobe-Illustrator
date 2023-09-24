// Гена Dilnok Панасин
// https://www.behance.net/dilnok
// Adobe Illustrator script

// Проверка открытого документа
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var sel = doc.selection;

  // Проверка выбраного объекта
  if (sel.length > 0) {
    var selectedObject = sel[0]; // Последний выбранный объект

    // Получение номера активной монтажной области (index)
    var activeArtboardIndex = doc.artboards.getActiveArtboardIndex();
    var activeArtboard = doc.artboards[activeArtboardIndex];

    // Получение размеров монтажной области
    var artboardRect = activeArtboard.artboardRect;
    var artboardWidth = artboardRect[2] - artboardRect[0]; // Ширина
    var artboardHeight = artboardRect[1] - artboardRect[3]; // Высота

    // Получение размеров выбранного объекта по габаритам
    var objBounds = selectedObject.geometricBounds;
    var objWidth = objBounds[2] - objBounds[0]; // Ширина
    var objHeight = objBounds[1] - objBounds[3]; // Высота

    // Расчет для растягивания
    var scaleX = artboardWidth / objWidth;
    var scaleY = artboardHeight / objHeight;

    // Растягивание объекта
    selectedObject.resize(scaleX * 100, scaleY * 100, true, true, true, true, 0, Transformation.CENTER);

	// Переместить выбранный объект на монтажную область в левый верхний угол
    var newObjBounds = selectedObject.geometricBounds;
    var offsetX = artboardRect[0] - newObjBounds[0];
    var offsetY = artboardRect[1] - newObjBounds[1];
    selectedObject.translate(offsetX, offsetY);	
	
		// Оставить выбранный объект не перемещая
//    var newObjBounds = selectedObject.geometricBounds;
//    var offsetX = (artboardWidth - (newObjBounds[2] - newObjBounds[0])) / 2;
//    var offsetY = (artboardHeight - (newObjBounds[1] - newObjBounds[3])) / 2;
//    selectedObject.translate(offsetX, offsetY);
	
  }
} else {
  alert("Нет активного документа.");
}
