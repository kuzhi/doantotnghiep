app.controller("product__management-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Thực đơn';
	$scope.titleBread = 'Món ăn';
	
	$scope.insert = function(){
		$scope.titleTable = 'Thêm món mới';
		
	}
	
	$scope.edit = function(){
		$scope.titleTable = 'Cập nhật món';
		
	}

	$scope.insertCate = function(){
		$scope.titleTable = 'Thêm loại mới';
		
	}
	
	$scope.editCate = function(){
		$scope.titleTable = 'Cập nhật';
		
	}
	
	
})