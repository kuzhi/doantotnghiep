app.controller("user__management-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Nhân viên';
	$scope.titleBread = 'Tất cả';

	$scope.insert = function () {
		$scope.title = 'Thêm nhân viên';
		$scope.statusInput = true;
	}
	
	$scope.edit = function () {
		$scope.title = 'Cập nhật nhân viên';
		$scope.statusInput = false;
	}
})