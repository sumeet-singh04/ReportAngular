WebLearning.controller("signInCTLR",['$scope','$log',function($scope,console)
	{
		console.log("Loading Sign in ctlr");
		$scope.clicked = function()
		{
			$scope.$emit("SignIn");
		};
	
		$scope.clickedTest = function()
		{
			
		};
	}]);