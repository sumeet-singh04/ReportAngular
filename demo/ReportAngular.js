var xmlObj = new XMLHttpRequest();
var indexData, moduleName;
var reportCount = 0;

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

	// alert(JSON.stringify(WebLearning));
	getDependencies(document.getElementById("report.moduleName").value, divEle);
}

function getDependencies(moduleName, divEle) {

	var moduleDependencies = [];
	var moduleCtrl = [];
	var moduleDrctv = [];
	var moduleSrvc = [];

	this.moduleName = moduleName;
	var v_module = angular.module(moduleName);

	if (v_module.requires.length > 0) {
		for (var i = 0; i < v_module.requires.length; i++) {
			var moduleObj = new Object();
			moduleObj = angular.module(v_module.requires[i]);
			moduleDependencies.push(moduleObj);
		}
	}

	var providerArray = v_module._invokeQueue;
	for (var i = 0; i < providerArray.length; i++) {
		if (providerArray[i][1] == 'register')
			moduleCtrl.push(providerArray[i]);
		else if (providerArray[i][1] == 'directive')
			moduleDrctv.push(providerArray[i]);
		else if (providerArray[i][1] == 'service')
			moduleSrvc.push(providerArray[i]);
	}

	writeResults(moduleDependencies, moduleCtrl, moduleDrctv, moduleSrvc,
			divEle);

}

function writeResults(moduleDependencies, moduleCtrl, moduleDrctv, moduleSrvc,
		divName) {
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
	for (var i = 0; i < moduleDrctv.length; i++) {
		trEle = document.createElement('tr');
		tdEle = document.createElement('td');
		txtNode = document.createTextNode(moduleSrvc[i][2][0]);
		tdEle.appendChild(txtNode);
		trEle.appendChild(tdEle);
		srvcTable.appendChild(trEle);
	}

	document.getElementById(divName).innerHTML = '';
	document.getElementById(divName).setAttribute('class', 'reports');
	document.getElementById(divName).innerHTML = '<h3>Module Name : '
			+ moduleName + '</h3>';
	document.getElementById(divName).appendChild(moduleTable);
	document.getElementById(divName).appendChild(ctrlTable);
	document.getElementById(divName).appendChild(drctvTable);
	document.getElementById(divName).appendChild(srvcTable);

}

function getModule(moduleName) {
	getDependencies(moduleName, 'create');
}
