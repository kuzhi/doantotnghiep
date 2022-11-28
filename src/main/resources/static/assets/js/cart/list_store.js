app.controller("cart-ctrl", function($scope, $http, $location) {
	$scope.listStore = [];
	$http.get("/api/store")
	.then(resp => {
		$scope.listStore = resp.data;
		$scope.listStore.forEach(store => {
			store.phone = store.phone.substr(0, 3)+ '-' + store.phone.substr(3, 3)+ '-' + store.phone.substr(6, 4);
		})
	})
	// Phân trang và điều hướng
	$scope.pager = {
		page: 0,
		size: 9,
		get listStore() {
			var start = this.page * this.size;
			return $scope.listStore.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.listStore.length / this.size);
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
})