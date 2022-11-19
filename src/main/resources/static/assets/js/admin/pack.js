app.controller("pack-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Gói dịch vụ';
	$scope.titleBread = 'Duyệt gói dịch vụ trong hệ thống';
	
	$scope.status = 1;
	$scope.showBtn = true;
	
	$scope.list = {
		pack: [
			{
				name: 'gói 1 năm',
				price: 200000,
				date: 365,
				image: 'goi1nam.png',
				status: 2
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
	
	$scope.insert = function() {
		$scope.showBtn = true;
		console.log($scope.showBtn)
	}
	
	$scope.edit = function() {
		$scope.showBtn = false;
		console.log($scope.showBtn)
	}
	
})