app = angular.module("cart__app", ["ngRoute"]);
app.controller("cart__app-ctrl", function($scope, $http, $location) {
	$scope.title = 'Tất cả';
	$scope.check = false;

	$scope.c1 = function() {
		$scope.title = 'Loại 1';
	}
	$scope.c2 = function() {
		$scope.title = 'Loại 2';
	}
	$scope.c3 = function() {
		$scope.title = 'Loại 3';
	}

	$scope.add = function() {
		$scope.check = true;
	}
})