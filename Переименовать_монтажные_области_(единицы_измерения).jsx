// Гена Панасин
// https://www.behance.net/dilnok
// Adobe Illustrator script

// Создание диалогового окна для выбора единиц измерения
// Create dialog window
var dialog = new Window("dialog", "Выберите единицы измерения");
dialog.orientation = "row"; 
dialog.alignChildren = ["left","top"]; 
dialog.spacing = 10; 
dialog.margins = 16; 

// Выбор поведения
var group1 = dialog.add("group", undefined, {name: "group1"}); 
group1.preferredSize.width = 150; 
group1.orientation = "column"; 
group1.alignChildren = ["fill","top"]; 
group1.spacing = 10; 
group1.margins = 0; 
group1.alignment = ["left","fill"]; 

var panel1 = group1.add("panel", undefined, undefined, {name: "panel1"}); 
panel1.orientation = "column"; 
panel1.alignChildren = ["left","top"]; 
panel1.spacing = 10; 
panel1.margins = 10; 
panel1.alignment = ["fill","top"]; 

var docNameLabel = panel1.add('statictext', undefined, undefined, {name: "statictext1"});
docNameLabel.text = 'Название перед';
docNameLabel.alignment = ["fill","bottom"]; 

var docName = panel1.add('edittext {properties: {name: "edittext1"}}');
docName.text = app.activeDocument.name + ' ';
docName.alignment = ["fill","top"]; 

var replaceCheckboxButton = panel1.add("checkbox", undefined, "Заменить");
var offsetCheckboxButton = panel1.add("checkbox", undefined, "Изменить вниз от выбранного");

// Выбор едениц измерения
var group2 = dialog.add("group", undefined, {name: "Выбор едениц измерения"});
group2.preferredSize.width = 150;
group2.orientation = "column";
group2.alignChildren = ["fill","top"];
group2.spacing = 10;
group2.margins = 0;
group2.alignment = ["left","fill"];

var panel2 = group2.add("panel", undefined, undefined, {name: "panel2"}); 
panel2.text = "Выбор едениц измерения"; 
panel2.orientation = "column"; 
panel2.alignChildren = ["left","top"]; 
panel2.spacing = 10; 
panel2.margins = 10; 
panel2.alignment = ["fill","top"]; 

var pixelsRadioButton = panel2.add("radiobutton", undefined, "Пиксели");
var pointsRadioButton = panel2.add("radiobutton", undefined, "Пункты");
var inchesRadioButton = panel2.add("radiobutton", undefined, "Дюймы");
var feetRadioButton = panel2.add("radiobutton", undefined, "Футы");
var yardsRadioButton = panel2.add("radiobutton", undefined, "Ярды");
var millimetersRadioButton = panel2.add("radiobutton", undefined, "Миллиметры");
var centimetersRadioButton = panel2.add("radiobutton", undefined, "Сантиметры");
var metersRadioButton = panel2.add("radiobutton", undefined, "Метры");

var okButton = dialog.add("button", undefined, "OK");
var cancelButton = dialog.add("button", undefined, "Отмена");

okButton.onClick = function() {
    dialog.close();

    // Получение выбранных единиц измерения
    // Getting the selected units of measure
    var units = "";
    if (pixelsRadioButton.value) {
        units = "px";
    } else if (pointsRadioButton.value) {
        units = "pt";
    } else if (inchesRadioButton.value) {
        units = "in";
    } else if (feetRadioButton.value) {
        units = "ft";
    } else if (yardsRadioButton.value) {
        units = "yd";
    } else if (centimetersRadioButton.value) {
        units = "cm";
    } else if (millimetersRadioButton.value) {
        units = "mm";
    } else if (metersRadioButton.value) {
        units = "m";
    }

    // Получение активного документа
	// Getting the active document
    var doc = app.activeDocument;

    // Перебор всех монтажных областей
	// Overlap all mounting areas
    for (var i = 0; i < doc.artboards.length; i++) {
		if (
		  !offsetCheckboxButton.value
		  || (
		    offsetCheckboxButton.value &&
			i >= doc.artboards.getActiveArtboardIndex()
		  )
		) {
			var artboard = doc.artboards[i];
			var name = "";

			// Получение размеров монтажной области
			//Getting the dimensions of the mounting area
			var width = artboard.artboardRect[2] - artboard.artboardRect[0];
			var height = artboard.artboardRect[1] - artboard.artboardRect[3];

			// Форматирование имени в зависимости от выбранных единиц измерения
			// Rename artboards depending on the selected units
			switch (units) {
				case "px":
					name = Math.round(width) + "x" + Math.round(height) + "px";
					break;
				case "pt":
					name = Math.round(width) + "x" + Math.round(height) + "pt";
					break;
				case "in":
					name = (width / 72).toFixed(2) + "x" + (height / 72).toFixed(2) + "in";
					break;
				case "ft":
					name = (width / 72 / 12).toFixed(2) + "x" + (height / 72 / 12).toFixed(2) + "ft";
					break;
				case "yd":
					name = (width / 72 / 36).toFixed(2) + "x" + (height / 72 / 36).toFixed(2) + "yd";
					break;
				case "cm":
					name = Math.round(width / 28.3464567) + "x" + Math.round(height / 28.3464567) + "cm";
					break;
				case "mm":
					name = Math.round(width / 2.83464567 ) + "x" + Math.round(height / 2.83464567 ) + "mm";
					break;
				case "m":
					name = (width / 2834.64567).toFixed(2) + "x" + (height / 2834.64567).toFixed(2) + "m";
					break;
				default:
					break;
			}

			// Изменение имени монтажной области
			//Changing the name of an editing area
			if (replaceCheckboxButton.value) {
				if (docName.text) {
					doc.artboards[i].name = docName.text + name;
				} else {
					doc.artboards[i].name = name;
				}
			} else {
			  doc.artboards[i].name += ' ' + name;
			}
		}
    }

};

cancelButton.onClick = function() {
    dialog.close();
};

dialog.show();
