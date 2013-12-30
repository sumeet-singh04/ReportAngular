var xmlObj = new XMLHttpRequest();
var indexData,division,moduleName;


function getIndexPage() {
	var url = document.getElementById('urlName').value;
	xmlObj.open("GET", url, false);
	xmlObj.send();
	indexData = xmlObj.responseText;
	divison = document.getElementById('check');
	divison.setAttribute("style", "display:none");
	divison.innerHTML = indexData;
	loadScriptTags();
}

function loadScriptTags()
{
	var scriptTag = divison.getElementsByTagName("script");
	for (var i = 0; i < scriptTag.length; i++) {
		var tag = scriptTag[i];
		var scriptSrc = tag.getAttribute('src');
		xmlObj.open("GET", scriptSrc, false);
		xmlObj.send();
		eval(xmlObj.responseText);
	}
	moduleName = document.getElementById("report.moduleName").value;
	alert(JSON.stringify(WebLearning));
	getDependencies(moduleName);
}


function getDependencies(moduleName)
{
	var moduleDependencies = [];
	var moduleCtrl = [];
	var moduleDrctv = [];
	var moduleSrvc = [];
	var v_module = angular.module("Web-Learning");

	if(v_module.requires.length >0)
	{
		for(var i=0;i<v_module.requires.length;i++)
		{
			var moduleOBj = new Object();
			moduleObj = angular.module(v_module.requires[i]);
			moduleDependencies.push(moduleObj);
		}
	}

	var providerArray  = v_module._invokeQueue;
	for(var i=0;i<providerArray.length;i++)
	{
		if(providerArray[i][1]=='register') moduleCtrl.push(providerArray[i]);
		else if(providerArray[i][1]=='directive') moduleDrctv.push(providerArray[i]);
		else if(providerArray[i][1]=='service') moduleSrvc.push(providerArray[i]); 
	}

	alert("done");

	writeResults(moduleDependencies,moduleCtrl,moduleDrctv,moduleSrvc);

}

function writeResults(moduleDependencies,moduleCtrl,moduleDrctv,moduleSrvc)
{
//Writing Module Dependencies Table
	var moduleTable = document.createElement('table');
	if(moduleDependencies.length>0) moduleTable.setAttribute('border', '2');
	else  moduleTable.setAttribute('style', 'display:none');

	//Creating column Header
	var txtNode = document.createTextNode('Module Dependencies');
	var trEle = document.createElement('tr');
	var thEle = document.createElement('th');
	thEle.appendChild(txtNode);
	trEle.appendChild(thEle);
	moduleTable.appendChild(trEle);

	//Creating rows
	for(var i=0;i<moduleDependencies.length;i++)
	{
		trEle = document.createElement('tr');
		tdEle = document.createElement('td');
		txtNode = document.createTextNode(moduleDependencies[i].name);
		tdEle.appendChild(txtNode);
		trEle.appendChild(tdEle);
		moduleTable.appendChild(trEle);
	}
	
	document.getElementsByTagName('body')[0].appendChild(moduleTable);

	
	//Writing all controllers table
	var ctrlTable = document.createElement('table');
	if(moduleCtrl.length <=0) moduleCtrl.setAttribute('style','display:none');
	
	//Creating column Header
	txtNode = document.createTextNode('Controllers');
	trEle = document.createElement('tr');
	thEle = document.createElement('th');
	thEle.appendChild(txtNode);
	trEle.appendChild(thEle);
	moduleTable.appendChild(trEle);
	
	//creating rows
	for(var i=0;i<moduleCtrl.length;i++)
	{
		trEle = document.createElement('tr');
		tdEle = document.createElement('td');
		txtNode = document.createTextNode(moduleCtrl[i][2][0]);
		tdEle.appendChild(txtNode);
		trEle.appendChild(tdEle);
		ctrlTable.appendChild(trEle);
	}
	
	document.getElementsByTagName('body')[0].appendChild(ctrlTable);
}
