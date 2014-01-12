WebLearning.directive("tags",['$log',function(console){
var check = 
{ 
	restrict	: 'A',
	scope :
		{
			check : '='
		},
	templateUrl :  'Partials/PRTL_index.html',
	link:function(scope,element)
	{
		alert("drctv : " + scope.check);
	}
};

return check;

}]);