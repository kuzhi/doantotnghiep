app.controller("order__management-all-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = true;
	$scope.titleTable = 'Tất cả hóa đơn';
	$scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Tất cả';
})

app.controller("order__management-loading-ctrl", function($scope, $http, $location) {
    $scope.statusShowAction = true;
    $scope.titleTable = 'Hóa đơn đang chờ duyệt';
    $scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Chờ duyệt';
})

app.controller("order__management-success-ctrl", function($scope, $http, $location) {
    $scope.statusShowAction = false;
    $scope.titleTable = 'Hóa đơn đã giao';
    $scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Đã duyệt';
})