/**
 * 
 */

/*style = { // supported styles: borders, hAlign, formatCode and font style
						borders: cell.borders, 
						hAlign: cell.hAlign,
						vAlign: cell.vAlign,
						bold: cell.bold,
						italic: cell.italic,
						fontName: cell.fontName,
						fontSize: cell.fontSize,
						formatCode: cell.formatCode || 'General'
					};*/

function downloadExcel(moduleName)
{
	
	var headings = ['Module Dependencies','Controllers','Directives','Services','Constants','Values'];
	var moduleObj = moduleMap[moduleName];
	
var file = {
        worksheets: [[]], // worksheets has one empty worksheet (array)
        creator: 'ReportAngular', created: new Date(),
        lastModifiedBy: 'ReportAngular', modified: new Date(),
        activeWorksheet: 0
    };

var w = file.worksheets[0];
w.name = moduleName;

w.data = [];

var headingRow = [];
for(var i=0;i<headings.length;i++)
	{
		var cell = new Object();
		cell.value = headings[i];
		cell.borders = {
				left:'0000CD',
				right:'0000CD',
				bottom:'0000CD',
				top:'0000CD'
		};
		cell.bold = 'true';
		cell.fontSize = '22';
		cell.fontName = 'Arial';
		cell.hAlign = 'left';
		cell.vAlign = 'top';
		cell.formatCode = 'textWrap';
		headingRow.push(cell);
	}


w.data.push(headingRow);

/*'moduleCtrl':moduleCtrl,
'moduleDrctv': moduleDrctv,
'moduleSrvc':moduleSrvc,
'moduleCnst':moduleCnst,
'moduleVo':moduleVo,*/

var countRow = Math.max(moduleObj.moduleCtrl.length,moduleObj.moduleDrctv.length,moduleObj.moduleSrvc.length
		,moduleObj.moduleCnst.length,moduleObj.moduleVo.length,moduleObj.moduleDependencies.length);
for(var j=0;j<countRow;j++)
	{
		var dataRow = [];
		
		if(moduleObj.moduleDependencies[j]) dataRow.push(moduleObj.moduleDependencies[j].name);
		else dataRow.push('');
		
		if(moduleObj.moduleCtrl[j]) dataRow.push(moduleObj.moduleCtrl[j][2][0]);
		else dataRow.push('');
		
		if(moduleObj.moduleDrctv[j]) dataRow.push(moduleObj.moduleDrctv[j][2][0]);
		else dataRow.push('');
		
		if(moduleObj.moduleSrvc[j]) dataRow.push(moduleObj.moduleSrvc[j][2][0]);
		else dataRow.push('');
		
		if(moduleObj.moduleCnst[j]) dataRow.push(moduleObj.moduleCnst[j][2][0]);
		else dataRow.push('');
		
		if(moduleObj.moduleVo[j]) dataRow.push(moduleObj.moduleVo[j][2][0]);
		else dataRow.push('');
		
		w.data.push(dataRow);
	}




/*var r = w.push([]) - 1;
w[r].push("check");
r = w.push([]) - 1;
w[r].push("check");*/
window.location = xlsx(file).href();
}