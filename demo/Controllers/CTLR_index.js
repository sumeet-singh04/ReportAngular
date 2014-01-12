WebCTLR.controller("indexCTLR",['$scope','$log','$location',function($scope,console,location)
	{
		console.log("Loading main ctlr");
		$scope.indexUrl = "Partials/PRTL_index.html";
		$scope.work = 'checking';
		var getLoginPartial = function()
		{
			console.log("captured emit");	
			//$scope.indexUrl = "Partials/PRTL_Login.html";
			$scope.work="changed";
		};
	
		$scope.$on("Login",getLoginPartial);
	}]);
	
