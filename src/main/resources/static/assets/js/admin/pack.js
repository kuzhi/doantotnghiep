app.controller("pack-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Gói dịch vụ';
	$scope.titleBread = 'Gói dịch vụ';
	
	$scope.status = 4;
	
	$scope.all = function() {
		$scope.list = {
			pack: [
				{
					name: 'gói 1 năm',
					price: 200000,
					date: 365,
					image: 'goi1nam.png',
					status: 0
				},
				{
					name: 'gói 1 năm',
					price: 200000,
					date: 365,
					image: 'goi1nam.png',
					status: 1
				},
				{
					name: 'gói 1 năm',
					price: 200000,
					date: 365,
					image: 'goi1nam.png',
					status: 1
				},
			]
		}
	}
	
	$scope.loading = function() {
		$scope.list = {
			pack: [
				{
					name: 'gói 1 năm',
					price: 200000,
					date: 365,
					image: 'goi1nam.png',
					status: 0
				},
			]
		}
	}
	
	$scope.completed = function() {
		$scope.list = {
			pack: [
				{
					name: 'gói 1 năm',
					price: 200000,
					date: 365,
					image: 'goi1nam.png',
					status: 1
				},
				{
					name: 'gói 1 năm',
					price: 200000,
					date: 365,
					image: 'goi1nam.png',
					status: 1
				},
			]
		}
	}
	
	$scope.all();
	
})