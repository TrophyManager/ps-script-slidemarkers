var width = 535;
var spacing = 8;
var from = 2;
var to = 10;
function main() {
	var layers = app.activeDocument.layers;
	// var layer = layers[0];
	// layer.visible = true;
	for(var j = app.activeDocument.layers.length-1; j>=0; j--) {
		try {
			// app.activeDocument.layers[j].visible = false;
			app.activeDocument.layers[j].remove();
		} catch(Exception) {}
	}
	for (var i=from; i<=to;i++) {
		for(var j = app.activeDocument.layers.length-1; j>=0; j--) {
			try {
				app.activeDocument.layers[j].visible = false;
				app.activeDocument.layers[j].remove();
			} catch(Exception) {}
		}

		var w = (width - (i-1)*spacing) / i;
		for(var j=0; j<i; j++) {
			DrawShape(
				[j*w + j*spacing, 0],
				[(j+1)*w + j*spacing, 0],
				[(j+1)*w + j*spacing, 20],
				[j*w + j*spacing, 20],
				);
			// try {
			// 	layers[layers.lenght-1].rasterize(RasterizeType.ENTIRELAYER);
			// } catch(Exception) {}
		}
		try{
			app.activeDocument.mergeVisibleLayers(); 
		} catch(Exception) {}
		// convertToIndexed();
		// convertToRGB();
		// var newLayer = app.activeDocument.layers.add();
		// app.activeDocument.activeLayer = newLayer;
		// var w = (width - (i-1)*spacing) / i;
		// for(var j=0; j<i; j++) {
		// 	fillSquare(j*w + j*spacing, 0, w, 20);
		// }
		SaveForWeb("d:\\slide_marker_"+i+".png", 100);

	}

}

main();


function SaveForWeb(path, jpegQuality) {  
	var sfwOptions = new ExportOptionsSaveForWeb();   
	   sfwOptions.format = SaveDocumentType.PNG;
	   // sfwOptions.includeProfile = false;   
	   // sfwOptions.interlaced = 0;   
	   // sfwOptions.optimized = true;   
	   sfwOptions.PNG8 = true;
	   sfwOptions.transparency = true;
	   // sfwOptions.transparencyAmount = 1;
	   sfwOptions.quality = jpegQuality; //0-100   
	var pngFile = new File(path);
	activeDocument.exportDocument(pngFile, ExportType.SAVEFORWEB, sfwOptions);  
}  


function fillSquare(x,y,w,h) {
	var shapeRef = [ [x,y], [x,y+h], [x+w,y+h], [x+w,y] ];
	app.activeDocument.selection.select(shapeRef);
	var fillColor = new SolidColor();
	fillColor.rgb.red = 255;
	fillColor.rgb.green = 255;
	fillColor.rgb.blue = 255;
	app.activeDocument.selection.fill( fillColor, ColorBlendMode.VIVIDLIGHT, 25, false );
}
function DrawShape() {
    
    var doc = app.activeDocument;
    var y = arguments.length;
    var i = 0;
    
    var lineArray = [];
    for (i = 0; i < y; i++) {
        lineArray[i] = new PathPointInfo;
        lineArray[i].kind = PointKind.CORNERPOINT;
        lineArray[i].anchor = arguments[i];
        lineArray[i].leftDirection = lineArray[i].anchor;
        lineArray[i].rightDirection = lineArray[i].anchor;
    }

    var lineSubPathArray = new SubPathInfo();
    lineSubPathArray.closed = true;
    lineSubPathArray.operation = ShapeOperation.SHAPEADD;
    lineSubPathArray.entireSubPath = lineArray;
    var myPathItem = doc.pathItems.add("myPath", [lineSubPathArray]);
    

    var desc88 = new ActionDescriptor();
    var ref60 = new ActionReference();
    ref60.putClass(stringIDToTypeID("contentLayer"));
    desc88.putReference(charIDToTypeID("null"), ref60);
    var desc89 = new ActionDescriptor();
    var desc90 = new ActionDescriptor();
    var desc91 = new ActionDescriptor();
    desc91.putDouble(charIDToTypeID("Rd  "), 255.000000); // R
    desc91.putDouble(charIDToTypeID("Grn "), 255.000000); // G
    desc91.putDouble(charIDToTypeID("Bl  "), 255.000000); // B
    var id481 = charIDToTypeID("RGBC");
    desc90.putObject(charIDToTypeID("Clr "), id481, desc91);
    desc89.putObject(charIDToTypeID("Type"), stringIDToTypeID("solidColorLayer"), desc90);
    desc88.putObject(charIDToTypeID("Usng"), stringIDToTypeID("contentLayer"), desc89);
    executeAction(charIDToTypeID("Mk  "), desc88, DialogModes.NO);
    
    myPathItem.remove();
}

function convertToIndexed() {
    // write options for indexed color mode here 
    myObject = new IndexedConversionOptions();
    myObject.palette = Palette.EXACT;
    myObject.forced = ForcedColors.BLACKWHITE;
    myObject.matte = MatteType.NONE;
    myObject.transparency = true;
    // myObject.colors = 3;
    app.activeDocument.changeMode(ChangeMode.INDEXEDCOLOR, myObject);
};

function convertToRGB() {
    app.activeDocument.changeMode(ChangeMode.RGB);
}