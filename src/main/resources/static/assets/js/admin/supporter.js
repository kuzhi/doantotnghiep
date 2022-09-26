app.controller("supporter-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Cấp quyền';
	$scope.titleBread = 'Phân công quản trị';
	
	
	$scope.edit = function(){
		$scope.titleTable = 'Cấp quyền quản trị cho kênh';
		
	}

	$scope.editCate = function(){
		$scope.titleTable = 'Cập nhật';
		
	}
	
	
})