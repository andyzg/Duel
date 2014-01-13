function IndexCtrl($scope, $http) {
	$scope.get= function() {
		$http({method:'GET', url:'/id'}).
			success(function(data, status, headers, config) {
				$scope.name = data.toString();
			}).
			error(function(data, status, headers, config) {
				$scope.name = 'Error';
			});
	};
}

function ProfileCtrl($scope) {
	
}

function HomeCtrl($scope) {
	
}

function ProblemCtrl($scope) {
	
}

function NewProbCtrl($scope) {
	
}