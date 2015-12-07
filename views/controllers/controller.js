var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	console.log("Hello world from controller");

	var refresh = function(){
		$http.get('/api/users').success(function(response){
			console.log("I got the data I requested");
			$scope.users = response;			//will put the data into our index.html file (browser)
			$scope.user = "";						//clear input boxes on refresh

		});
	};

	refresh();

	$scope.addContact = function(){				//refers to addContact in html file
		console.log($scope.user)
		// send input data to the server
		$http.post('/api/users', $scope.user).success(function(response){
			console.log(response);
			refresh();
		});		

	};	

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/api/users/' + id).success(function(response){
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/api/users/' + id).success(function(response){
			$scope.user = response;
		});
	};

	$scope.update = function(){
		console.log($scope.user._id);
		// send everything in the insert boxes to the server
		$http.put('/api/users/' + $scope.user._id, $scope.user).success(function(response){
			refresh();
		});	
	};

	// Clear all input boxes
	$scope.clear = function(){
		$scope.user = "";
	}




}]);