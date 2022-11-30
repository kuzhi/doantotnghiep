app.controller("sales-channel-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Kênh bán hàng';
	$scope.titleBread = 'Kênh quản lý';
	$scope.stores = [];
	
	$scope.init = function(){

	  $http.get("/api/store")
			.then(resp => {
				$scope.stores = resp.data;
				
		});
	}


	// Phân trang và điều hướng
	$scope.pager = {
		page: 0,
		size: 10,
		get stores() {
			var start = this.page * this.size;
			return $scope.stores.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.stores.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		},
	}
	$scope.init();

	// Edit sale
	$scope.formStore = {};
	$scope.edit = function(stores) {
		$scope.formStore = angular.copy(stores);
		
	}

	//
	$scope.listFilter = [
		{ id: 1, name: "Fullname giảm dần A-Z" },
		{ id: 2, name: "Fullname tăng dần Z-A" },
		{ id: 3, name: "Giới tính nam" },
		{ id: 4, name: "Giới tính nữ" },
	]
})