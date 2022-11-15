app.controller("order-pack-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Gói dịch vụ';
	$scope.titleBread = 'Quản lý gói dịch vụ';
	
	$scope.status = 1;
	$scope.showBtn = true;
	
	$scope.list = {
		pack: [
			{
				name: 'gói 1 năm',
				price: 200000,
				date: 365,
				image: 'goi1nam.png',
				date: "15-11-2022"
			},
			{
				name: 'gói 1 năm',
				price: 200000,
				date: 365,
				image: 'goi1nam.png',
				date: "15-11-2022"
			},
			{
				name: 'gói 1 năm',
				price: 200000,
				date: 365,
				image: 'goi1nam.png',
				date: "15-11-2022"
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