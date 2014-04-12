var xmlObj = new XMLHttpRequest();
var indexData, moduleName;
var reportCount = 0;
var moduleMap = {};

function checkVal()
{
	var url = document.getElementById('urlName').value;
	var moduleName = document.getElementById("report.moduleName").value;
	if(url != '' && moduleName != '')
		{
		document.getElementById("go").removeAttribute('disabled');
		}
	
}

function getIndexPage() {
	try {
		var url = document.getElementById('urlName').value;
		xmlObj.open("GET", url, false);
		xmlObj.send();
		indexData = xmlObj.responseText;
		divison = document.getElementById('check');
		divison.setAttribute("style", "display:none");
		divison.innerHTML = indexData;
		loadScriptTags('report');		
	} catch (e) {
		alert("Error has occured - " + e.name+" - "+e.message);
	}
}

function loadScriptTags(divEle) {
	var scriptTag = divison.getElementsByTagName("script");

	for (var i = 0; i < scriptTag.length; i++) {
		var tag = scriptTag[i];
		var scriptSrc = tag.getAttribute('src');
		xmlObj.open("GET", scriptSrc, false);
		xmlObj.send();
		eval(xmlObj.responseText);
	}


	getDependencies(document.getElementById("report.moduleName").value, divEle);
}

function getDependencies(moduleName, divEle) {

	var moduleDependencies = [];
	var moduleCtrl = [];
	var moduleDrctv = [];
	var moduleSrvc = [];
	var moduleCnst = [];
	var moduleVo = [];
	this.moduleName = moduleName;
	var v_module = angular.module(moduleName);

	
		for (var i = 0; i < v_module.requires.length; i++) {
			var moduleObj = new Object();
			moduleObj = angular.module(v_module.requires[i]);
			moduleDependencies.push(moduleObj);
		}
	

	var providerArray = v_module._invokeQueue;
	for (var i = 0; i < providerArray.length; i++) {
		if (providerArray[i][1] == 'register')
			moduleCtrl.push(providerArray[i]);
		else if (providerArray[i][1] == 'directive')
			moduleDrctv.push(providerArray[i]);
		else if (providerArray[i][1] == 'service')
			moduleSrvc.push(providerArray[i]);
		else if (providerArray[i][1] == 'value')
			moduleVo.push(providerArray[i]);
		else if(providerArray[i][1] == 'constant')
			moduleCnst.push(providerArray[i]);
	}
	
	moduleMap[moduleName] = {
			'moduleDependencies':moduleDependencies,
			'moduleCtrl':moduleCtrl,
			'moduleDrctv': moduleDrctv,
			'moduleSrvc':moduleSrvc,
			'moduleCnst':moduleCnst,
			'moduleVo':moduleVo,
			
	};
	

	writeResults(moduleDependencies, moduleCtrl, moduleDrctv, moduleSrvc,moduleVo,moduleCnst,
			divEle,moduleName);

}

function writeResults(moduleDependencies, moduleCtrl, moduleDrctv, moduleSrvc,moduleVo,moduleCnst,
		divName,moduleName) {
	// Writing Module Dependencies Table

	var moduleTable = document.createElement('table');
	if (moduleDependencies.length <= 0)
		moduleTable.setAttribute('style', 'display:none');

	// Creating column Header
	var txtNode = document.createTextNode('Module Dependencies');
	var trEle = document.createElement('tr');
	var thEle = document.createElement('th');
	thEle.appendChild(txtNode);
	trEle.appendChild(thEle);
	moduleTable.appendChild(trEle);

	// Creating rows
	for (var i = 0; i < moduleDependencies.length; i++) {
		trEle = document.createElement('tr');
		tdEle = document.createElement('td');
		aEle = document.createElement('a');
		// aEle.setAttribute('href','');
		aEle.setAttribute('onclick', 'getModule("' + moduleDependencies[i].name
				+ '")');
		txtNode = document.createTextNode(moduleDependencies[i].name);
		aEle.appendChild(txtNode);
		tdEle.appendChild(aEle);
		trEle.appendChild(tdEle);
		moduleTable.appendChild(trEle);
	}

	// Writing all controllers table
	var ctrlTable = document.createElement('table');
	if (moduleCtrl.length <= 0)
		ctrlTable.setAttribute('style', 'display:none');

	// Creating column Header
	txtNode = document.createTextNode('Controllers');
	trEle = document.createElement('tr');
	thEle = document.createElement('th');
	thEle.appendChild(txtNode);
	trEle.appendChild(thEle);
	ctrlTable.appendChild(trEle);

	// creating rows
	for (var i = 0; i < moduleCtrl.length; i++) {
		trEle = document.createElement('tr');
		tdEle = document.createElement('td');
		tdEle.setAttribute('onclick', 'displayCtrlDetails("'+moduleName+'","'+moduleCtrl[i][2][0]+'")');
		txtNode = document.createTextNode(moduleCtrl[i][2][0]);
		tdEle.appendChild(txtNode);
		trEle.appendChild(tdEle);
		ctrlTable.appendChild(trEle);
	}

	// Writing All Directives Table
	var drctvTable = document.createElement('table');
	if (moduleDrctv.length <= 0)
		drctvTable.setAttribute('style', 'display:none');

	// Creating column Header
	txtNode = document.createTextNode('Directives');
	trEle = document.createElement('tr');
	thEle = document.createElement('th');
	thEle.appendChild(txtNode);
	trEle.appendChild(thEle);
	drctvTable.appendChild(trEle);

	// creating rows
	for (var i = 0; i < moduleDrctv.length; i++) {
		trEle = document.createElement('tr');
		tdEle = document.createElement('td');
		tdEle.setAttribute('onclick', 'displayDrctvDetails("'+moduleName+'","'+moduleDrctv[i][2][0]+'")');
		txtNode = document.createTextNode(moduleDrctv[i][2][0]);
		tdEle.appendChild(txtNode);
		trEle.appendChild(tdEle);
		drctvTable.appendChild(trEle);
	}

	// Writing all services table
	var srvcTable = document.createElement('table');
	if (moduleSrvc.length <= 0)
		srvcTable.setAttribute('style', 'display:none');

	// Creating column Header
	txtNode = document.createTextNode('Services');
	trEle = document.createElement('tr');
	thEle = document.createElement('th');
	thEle.appendChild(txtNode);
	trEle.appendChild(thEle);
	srvcTable.appendChild(trEle);

	// creating rows
	for (var i = 0; i < moduleSrvc.length; i++) {
		trEle = document.createElement('tr');
		tdEle = document.createElement('td');
		tdEle.setAttribute('onclick', 'displaySrvcDetails("'+moduleName+'","'+moduleSrvc[i][2][0]+'")');
		txtNode = document.createTextNode(moduleSrvc[i][2][0]);
		tdEle.appendChild(txtNode);
		trEle.appendChild(tdEle);
		srvcTable.appendChild(trEle);
	}
	
	// Writing all VO's table
	var voTable = document.createElement('table');
	if (moduleVo.length <= 0)
		voTable.setAttribute('style', 'display:none');

	// Creating column Header
	txtNode = document.createTextNode('Value Objects');
	trEle = document.createElement('tr');
	thEle = document.createElement('th');
	thEle.appendChild(txtNode);
	trEle.appendChild(thEle);
	voTable.appendChild(trEle);

	// creating rows
	for (var i = 0; i < moduleVo.length; i++) {
		trEle = document.createElement('tr');
		tdEle = document.createElement('td');
		tdEle.setAttribute('onclick', 'displayVoDetails("'+moduleName+'","'+moduleVo[i][2][0]+'")');
		txtNode = document.createTextNode(moduleVo[i][2][0]);
		tdEle.appendChild(txtNode);
		trEle.appendChild(tdEle);
		voTable.appendChild(trEle);
	}
	
	// Writing all constant table
	var cnstTable = document.createElement('table');
	if (moduleCnst.length <= 0)
		cnstTable.setAttribute('style', 'display:none');

	// Creating column Header
	txtNode = document.createTextNode('Constants');
	trEle = document.createElement('tr');
	thEle = document.createElement('th');
	thEle.appendChild(txtNode);
	trEle.appendChild(thEle);
	cnstTable.appendChild(trEle);

	// creating rows
	for (var i = 0; i < moduleCnst.length; i++) {
		trEle = document.createElement('tr');
		tdEle = document.createElement('td');
		tdEle.setAttribute('onclick', 'displayCnstDetails("'+moduleName+'","'+moduleCnst[i][2][0]+'")');
		txtNode = document.createTextNode(moduleCnst[i][2][0]);
		tdEle.appendChild(txtNode);
		trEle.appendChild(tdEle);
		cnstTable.appendChild(trEle);
	}

	document.getElementById(divName).innerHTML = '';
	document.getElementById(divName).setAttribute('class', 'reports');
	document.getElementById(divName).innerHTML = '<h3>Module Name : '
			+ moduleName + '</h3>'+'<button>Download Excel</button>';
	document.getElementById(divName).getElementsByTagName("button")[0].setAttribute('onclick', 'downloadExcel("'+moduleName+'")');
	document.getElementById(divName).appendChild(moduleTable);
	document.getElementById(divName).appendChild(ctrlTable);
	document.getElementById(divName).appendChild(drctvTable);
	document.getElementById(divName).appendChild(srvcTable);
	document.getElementById(divName).appendChild(voTable);
	document.getElementById(divName).appendChild(cnstTable);

}

function getModule(moduleName) {
	getDependencies(moduleName, 'create');
}

function displayCtrlDetails(moduleName,moduleCtrl)
{
	// var detailEle = document.getElementById("popUpContent");
	var detailHeading = document.getElementById("popUpHeading");
	var detailInjectables = document.getElementById("injectables");
	var detailFnctnString = document.getElementById("fnctnString");
	detailHeading.innerHTML = '';
	detailInjectables.innerHTML = '';
	detailFnctnString.innerHTML = '';
	var CtrlObj = [];
	var CtrlObjs = moduleMap[moduleName].moduleCtrl;
	for(var i=0;i<CtrlObjs.length;i++)
		{
			if(CtrlObjs[i][2][0] == moduleCtrl)
				{
					CtrlObj  = CtrlObjs[i];
				}
		}
	// detailEle.innerHTML = "<h3
	// style='text-align:center;'>"+moduleCtrl+"</h3>";
	detailHeading.textContent = moduleCtrl;
	if(typeof CtrlObj[2][1] == 'function')
		{
		detailFnctnString.innerHTML = CtrlObj[2][1].toString().split(';').join(';<br>');
		// detailEle.innerHTML = detailEle.innerHTML + "<div
		// style='float:right;width: 70%;overflow: auto;display:
		// inline-block'>"+CtrlObj[2][1].toString()+"</div>";
		}
	else
	{
		detailInjectables.innerHTML =  CtrlObj[2][1].slice(0,CtrlObj[2][1].length-2).join('<br>');
		// detailEle.innerHTML = detailEle.innerHTML + "<div
		// style='float:left;width: 30%;overflow: auto;display: inline-block'>"+
		// CtrlObj[2][1].slice(0,CtrlObj[2][1].length-2).join(';')+"</div>";
		detailFnctnString.innerHTML = CtrlObj[2][1][CtrlObj[2][1].length-1].toString().split(';').join(';<br>');
		// detailEle.innerHTML = detailEle.innerHTML + "<div
		// style='float:right;width: 70%;overflow: auto;display:
		// inline-block'>"+CtrlObj[2][1][CtrlObj[2][1].length-1].toString()+"</div>";
	}
	
	location.hash = '#popUpDetails';
}

function displayDrctvDetails(moduleName,moduleDrctv)
{
	var detailHeading = document.getElementById("popUpHeading");
	var detailInjectables = document.getElementById("injectables");
	var detailFnctnString = document.getElementById("fnctnString");
	detailHeading.innerHTML = '';
	detailInjectables.innerHTML = '';
	detailFnctnString.innerHTML = '';
	var DrctvObj = [];
	var DrctvObjs = moduleMap[moduleName].moduleDrctv;
	for(var i=0;i<DrctvObjs.length;i++)
	{
		if(DrctvObjs[i][2][0] == moduleDrctv)
			{
				DrctvObj  = DrctvObjs[i];
			}
	}
	// detailEle.innerHTML = "<h3
	// style='text-align:center;'>"+moduleDrctv+"</h3>";
	detailHeading.textContent = moduleDrctv;
	if(typeof DrctvObj[2][1] == 'function')
	{
		// detailEle.innerHTML = detailEle.innerHTML + "<div
		// style='float:right;width: 70%;overflow: auto;display:
		// inline-block'>"+DrctvObj[2][1].toString()+"</div>";
		detailFnctnString.innerHTML = DrctvObj[2][1].toString().split(';').join(';<br>');  
	}
	else
	{
		detailInjectables.innerHTML =  DrctvObj[2][1].slice(0,DrctvObj[2][1].length-2).join('<br>');
		// detailEle.innerHTML = detailEle.innerHTML + "<div
		// style='float:left;width: 30%;overflow: auto;display: inline-block'>"+
		// DrctvObj[2][1].slice(0,DrctvObj[2][1].length-2).join(';')+"</div>";
		detailFnctnString.innerHTML = DrctvObj[2][1][DrctvObj[2][1].length-1].toString().split(';').join(';<br>');  
		// detailEle.innerHTML = detailEle.innerHTML + "<div
		// style='float:right;width: 70%;overflow: auto;display:
		// inline-block'>"+DrctvObj[2][1][DrctvObj[2][1].length-1].toString()+"</div>";
	}
	
	location.hash = '#popUpDetails';
}

function displaySrvcDetails(moduleName,moduleSrvc)
{
	// var detailEle = document.getElementById("popUpContent");
	var detailHeading = document.getElementById("popUpHeading");
	var detailInjectables = document.getElementById("injectables");
	var detailFnctnString = document.getElementById("fnctnString");
	detailHeading.innerHTML = '';
	detailInjectables.innerHTML = '';
	detailFnctnString.innerHTML = '';
	var SrvcObj = [];
	var SrvcObjs = moduleMap[moduleName].moduleSrvc;
	for(var i=0;i<SrvcObjs.length;i++)
	{
		if(SrvcObjs[i][2][0] == moduleSrvc)
			{
				SrvcObj  = SrvcObjs[i];
			}
	}
// detailEle.innerHTML = "<h3 style='text-align:center;'>"+moduleSrvc+"</h3>";
	detailHeading.textContent = moduleSrvc;
if(typeof SrvcObj[2][1] == 'function')
	{
	detailFnctnString.innerHTML = SrvcObj[2][1].toString().split(';').join(';<br>'); 
	// detailEle.innerHTML = detailEle.innerHTML + "<div
	// style='float:right;width: 70%;overflow: auto;display:
	// inline-block'>"+SrvcObj[2][1].toString()+"</div>";
	
	}
else
{
	detailInjectables.innerHTML =  SrvcObj[2][1].slice(0,SrvcObj[2][1].length-2).join('<br>');
	// detailEle.innerHTML = detailEle.innerHTML + "<div
	// style='float:left;width: 30%;overflow: auto;display: inline-block'>"+
	// SrvcObj[2][1].slice(0,CtrlObj[2][1].length-2).join(';')+"</div>";
	detailFnctnString.innerHTML = SrvcObj[2][1][SrvcObj[2][1].length-1].toString().split(';').join(';<br>'); 
	// detailEle.innerHTML = detailEle.innerHTML + "<div
	// style='float:right;width: 70%;overflow: auto;display:
	// inline-block'>"+SrvcObj[2][1][SrvcObj[2][1].length-1].toString()+"</div>";
	
}

location.hash = '#popUpDetails';
}

function displayVoDetails(moduleName,moduleVo)
{
	// var detailEle = document.getElementById("popUpContent");
	var detailHeading = document.getElementById("popUpHeading");
	var detailInjectables = document.getElementById("injectables");
	var detailFnctnString = document.getElementById("fnctnString");
	detailHeading.innerHTML = '';
	detailInjectables.innerHTML = '';
	detailFnctnString.innerHTML = '';
	var VoObj = [];
	var VoObjs = moduleMap[moduleName].moduleVo;
	for(var i=0;i<VoObjs.length;i++)
	{
		if(VoObjs[i][2][0] == moduleVo)
			{
			VoObj  = VoObjs[i];
			}
	}
	// detailEle.innerHTML = "<h3 style='text-align:center;'>"+moduleVo+"</h3>";
	detailHeading.textContent = moduleVo;
	detailHeading.innerHTML = detailHeading.innerHTML + "<h3 style='text-align:center;'>KEY    :   Value</h3>";
for(var key in VoObj[2][1])
	{
	if(VoObj[2][1].hasOwnProperty(key))
		{
		detailHeading.innerHTML = detailHeading.innerHTML + "<div style='text-align:center;'>"+key   +":"+   JSON.stringify(VoObj[2][1][key])+"</div>";
		}
	}

location.hash = '#popUpDetails';
}

function displayCnstDetails(moduleName,moduleCnst)
{
	var detailHeading = document.getElementById("popUpHeading");
	var detailInjectables = document.getElementById("injectables");
	var detailFnctnString = document.getElementById("fnctnString");
	detailHeading.innerHTML = '';
	detailInjectables.innerHTML = '';
	detailFnctnString.innerHTML = '';
	// var detailEle = document.getElementById("popUpContent");
	var CnstObj = [];
	var CnstObjs = moduleMap[moduleName].moduleCnst;
	for(var i=0;i<CnstObjs.length;i++)
	{
		if(CnstObjs[i][2][0] == moduleCnst)
			{
			CnstObj  = CnstObjs[i];
			}
	}
// detailEle.innerHTML = "<h3 style='text-align:center;'>"+moduleCnst+"</h3>";
	detailHeading.textContent = moduleCnst;
	detailHeading.innerHTML = detailHeading.innerHTML + "<h3 style='text-align:center;'>Constant Values</h3>";
for(var j=0;j<CnstObj[2][1].length;j++)
	{
	detailHeading.innerHTML = detailHeading.innerHTML + "<div style='text-align:center;'>"+JSON.stringify(CnstObj[2][1][j])+"</div>";
	}


location.hash = '#popUpDetails';
}

/*function loadExcelData()
{
	var ExcelData = [];
	var moduleDependencies = [];
	var moduleCtrl = [];
	var moduleDrctv = [];
	var moduleSrvc = [];
	var moduleCnst = [];
	var moduleVo = [];
	
	
	var v_module = angular.module(moduleName);

	do{
	
		for (var i = 0; i < v_module.requires.length; i++) {
			var moduleObj = new Object();
			moduleObj = angular.module(v_module.requires[i]);
			moduleDependencies.push(moduleObj);
		}
	

	var providerArray = v_module._invokeQueue;
	for (var i = 0; i < providerArray.length; i++) {
		if (providerArray[i][1] == 'register')
			moduleCtrl.push(providerArray[i]);
		else if (providerArray[i][1] == 'directive')
			moduleDrctv.push(providerArray[i]);
		else if (providerArray[i][1] == 'service')
			moduleSrvc.push(providerArray[i]);
		else if (providerArray[i][1] == 'value')
			moduleVo.push(providerArray[i]);
		else if(providerArray[i][1] == 'constant')
			moduleCnst.push(providerArray[i]);
		}
	
	
	}while(moduleDependencies.length>0)
	
	moduleMap[moduleName] = {
			'moduleCtrl':moduleCtrl,
			'moduleDrctv': moduleDrctv,
			'moduleSrvc':moduleSrvc,
			'moduleCnst':moduleCnst,
			'moduleVo':moduleVo,
			
	};
	
	downloadExcel();
	writeResults(moduleDependencies, moduleCtrl, moduleDrctv, moduleSrvc,moduleVo,moduleCnst,
			divEle,moduleName);
	}*/