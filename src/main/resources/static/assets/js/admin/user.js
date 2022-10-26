app.controller("user-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Người dùng';
	$scope.titleBread = 'Khách hàng';

	$scope.insert = function () {
		$scope.title = 'Thêm khách hàng mới';
		$scope.statusInput = true;
	}
	
	$scope.edit = function () {
		$scope.title = 'Cập nhật thông tin';
		$scope.statusInput = false;
	}
	
	$scope.list = {
		user: [
			{
				name: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				birtday: '1-1-1999',
				gender: true
			},
			{
				name: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				birtday: '1-1-1999',
				gender: true
			},
			{
				name: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				birtday: '1-1-1999',
				gender: true
			},
			{
				name: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				birtday: '1-1-1999',
				gender: true
			},
			{
				name: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				birtday: '1-1-1999',
				gender: true
			},
			{
				name: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				birtday: '1-1-1999',
				gender: true
			},
			{
				name: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				birtday: '1-1-1999',
				gender: true
			},
		]
	}
	
})