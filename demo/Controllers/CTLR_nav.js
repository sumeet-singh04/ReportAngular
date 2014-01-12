WebLearning.controller("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanavCTLR",
		['$scope','$log',function($scope,console)
	{
		console.log("Loading navCTLR");
		$scope.captureNav = function (click)
		{
			console.log("In captureNav : "+click);
			if(click == "Login")
				$scope.$emit('Login');
			else if(click == "AboutUs")
				$scope.$emit("AboutUs");
			else if(click == "ContactUs")
				$scope.$emit("ContactUs");
		};
	}]);