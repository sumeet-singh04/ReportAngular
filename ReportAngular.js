var xmlObj = new XMLHttpRequest();
var v_module,indexData,division,moduleName;
var ctrlObj; 


function getIndexPage() {

		var url = document.getElementById('urlName').value;
		
		xmlObj.open("GET", url, true);
		xmlObj.send();
		xmlObj.onreadystatechange = function() {

			if (xmlObj.readyState == 4) {
				indexData = xmlObj.responseText;

				divison = document.getElementById('check');
				divison.setAttribute("style", "display:none");
				divison.innerHTML = indexData;
				loadScriptTags();
			}

		};
	}

function loadScriptTags()
{
	var scriptTag = divison.getElementsByTagName("script");

	for (var i = 0; i < scriptTag.length; i++) {
		var tag = scriptTag[i];
		
			var scriptSrc = tag.getAttribute('src');
			
			xmlObj = new XMLHttpRequest();
			xmlObj.open("GET", scriptSrc, false);
			xmlObj.send();
			var check = true;
			xmlObj.onreadystatechange = function() {
					if (xmlObj.readyState == 4) {
					check = false;
					eval(xmlObj.responseText);
				}
			};
		}
	
	//alert(WebLearning);
	moduleName = document.getElementById("report.moduleName").value;
	getCTRLName(moduleName);
}


function getCTRLName(CtrlModule)
{
	v_module = angular.module("Web-Learning");
	
	var ctrlDiv = document.getElementById("report.ctrlName");
	var moduleArray  = v_module._invokeQueue;
	var ctrlObjList  = new Array();
	for(var i=0;i<moduleArray.length;i++)
		{
		ctrl = new Object();
		ctrl.name = moduleArray[i][2][0];
		ctrl.functionArray = moduleArray[i][2][1];
		ctrl.dependency = new Array();
		var functionString = ctrl.functionArray[ctrl.functionArray.length-1].toString();
		functionString = functionString.substring(0,functionString.indexOf('{'))
		ctrl.dependencyMapping = functionString.substring(functionString.indexOf('(')+1,functionString.lastIndexOf(')'));
		for(var j=0;j<ctrl.functionArray.length-1;j++)
			{
			
				ctrl.dependency.push(ctrl.functionArray[j]);
			}
		ctrlObjList.push(ctrl);
		}
	ctrlDiv.innerHTML = ctrlObjList[0].name + "  |||  " + ctrlObjList[0].dependency + " ||| " + ctrlObjList[0].dependencyMapping;
}