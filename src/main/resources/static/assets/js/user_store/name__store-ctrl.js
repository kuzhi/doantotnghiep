app.controller("name__store-ctrl", function($scope, $http, $location) {
    $scope.regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
	$scope.titleBread = 'Tên và liên hệ';
	$scope.titleBreadcrumb = 'Thông tin cửa hàng'
})