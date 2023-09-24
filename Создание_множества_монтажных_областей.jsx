// Гена и Александр Панасин
// https://www.behance.net/dilnok
// Adobe Illustrator script

/**
 * Строку в массив
 * @function
 * @param {String} string Строка чисел
 * @return {Array}
 */
function stringToArray(string) {
	var result = [];
	var regex = new RegExp('(\\d+)', 'g');
	var i = 0;
	
	while ((m = regex.exec(string)) !== null) {	
		if (result[i] === undefined) result.push([parseInt(m[0])]);
		else {
			result[i].push(m[0]);
			i += 1;
		}
	}
	
	return result;
}

/**
 * Создание монтажных областей
 * @function
 * @param {Document} doc Документ
 * @param {Array<Array<Int>>} data Массивы чисел
 */
function createArtboards(doc, data) {
	for (var i = 0; i < data.length; i += 1) {
		// Создать
		doc.artboards.add([0, 0, data[i][0], -data[i][1]]);
	};
}

// Документ
var doc = app.activeDocument;

// Модальное окно
var dialog = new Window("dialog", "Вставьте размеры");
dialog.orientation = "column"; 
dialog.alignChildren = ["left", "top"]; 
dialog.spacing = 10; 
dialog.margins = 16; 

// Строка ввода
var inputSizes = dialog.add('edittext {properties: {name: "edittext1"}}');
inputSizes.alignment = ["fill","top"]; 

// Кнопки
var okButton = dialog.add("button", undefined, "OK");
var cancelButton = dialog.add("button", undefined, "Отмена");

// Выполнить
okButton.onClick = function() {
	// Закрыть окно
    dialog.close();
	
	// Конвертировать строку в массив
	var data = stringToArray(inputSizes.text);

	// Создать монтажные области
	createArtboards(doc, data);
}

// Отменить
cancelButton.onClick = function() {
    dialog.close();
};

// Открыть окно
dialog.show();
