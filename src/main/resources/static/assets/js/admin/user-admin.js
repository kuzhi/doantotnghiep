app.controller("user-admin-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Người dùng';
	$scope.titleBread = 'Quản trị';

	$scope.insert = function () {
		$scope.title = 'Thêm nhân viên quản trị mới';
		$scope.statusInput = true;
	}
	
	$scope.edit = function () {
		$scope.title = 'Cập nhật thông tin';
		$scope.statusInput = false;
	}
})