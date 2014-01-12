WebLearning.controller("ActivationCTLR",['$scope','$log',function($scope,console)
{
	$scope.tagUrl = "Partials/tagId1.html";
//	$scope.tagId = 2;
	console.log("Activation CTLR loaded");
	$scope.ChangeTag1 = function()
	{
		$scope.tagUrl="Partials/tagId1.html";
	console.log("called changeTag1");
	};
	$scope.ChangeTag2 = function()
	{
	$scope.tagUrl="Partials/tagId2.html";
	console.log("called changeTag2");
	};
	$scope.ChangeTag3 = function()
	{
		$scope.tagUrl="Partials/tagId3.html";
	console.log("called changeTag3");
	
	};
}]);



