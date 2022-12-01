app.controller("order__management-all-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = true;
	$scope.titleTable = 'Tất cả Đơn hàng';
	$scope.titleBreadcrumb = 'Đơn hàng';
	$scope.titleBread = 'Tất cả';
	$scope.stores = {};
	$scope.ssSearch=true;

	$scope.keyword
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						$http.get("/api/order/store/" + $scope.stores.id + "/" + number + "/" + field + "/" + sort).then(resp => {
							$scope.page = resp.data;
							$scope.pageNumber = number;
							$scope.pageField = field;
							$scope.pageSort = sort;
						})
					})
			})


	}

	$scope.loadByKey = function() {

		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						$http.get("/api/findorders/storeandkeyword/" + $scope.stores.id + "/" + $scope.keyword).then(resp => {
							$scope.page = resp.data;
						})
					})
			})

	}

	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
			$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);
		})
	}

	$scope.confirm = function(orderid) {
		order = {
			id: orderid,
			status: 2
		}
		$http.put("/api/order/update", order).then(resp => {
			Swal.fire({ icon: 'success', title: 'Đơn hàng đã được duyệt thành công!' });
			$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);
		})
	}

	$scope.cancel = function(orderid) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-danger ms-2',
				cancelButton: 'btn btn-success'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: 'Thông báo',
			icon: 'warning',
			text: "Bạn có chắc muốn hủy đơn này?",
			showCancelButton: true,
			confirmButtonText: 'OK',
			cancelButtonText: 'Quay lại',
			reverseButtons: true,
			showClass: {
				popup: 'animate__animated animate__fadeInDownBig'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutUpBig'
			}
		}).then((result) => {
			if (result.isConfirmed) {
				order = {
					id: orderid,
					status: 5
				}
				$http.put("/api/order/update", order).then(resp => {
					Swal.fire({ icon: 'success', title: 'Đơn hàng đã hủy!' });
					$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);
				})
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}

})

app.controller("order__management-loading-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = true;
	$scope.titleTable = 'Đơn hàng đang chờ duyệt';
	$scope.titleBreadcrumb = 'Đơn hàng';
	$scope.titleBread = 'Chờ duyệt';
	$scope.stores={};
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 1;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						$http.get("/api/orders/store/" + $scope.stores.id + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
							$scope.page = resp.data;
							$scope.pageNumber = number;
							$scope.pageField = field;
							$scope.pageSort = sort;
						})
					})
			})


	}
	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
			$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);
		})
	}

	$scope.cancel = function(orderid) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-danger ms-2',
				cancelButton: 'btn btn-success'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: 'Thông báo',
			icon: 'warning',
			text: "Bạn có chắc muốn hủy đơn này?",
			showCancelButton: true,
			confirmButtonText: 'OK',
			cancelButtonText: 'Quay lại',
			reverseButtons: true,
			showClass: {
				popup: 'animate__animated animate__fadeInDownBig'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutUpBig'
			}
		}).then((result) => {
			if (result.isConfirmed) {
				order = {
					id: orderid,
					status: 5
				}
				$http.put("/api/order/update", order).then(resp => {
					swalWithBootstrapButtons.fire(
						'Thành công',
						'Đã hủy đơn hàng!',
						'success'
					)
					$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);
				})
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}


})

app.controller("order__management-confirmed-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = true;
	$scope.titleTable = 'Đơn hàng đã duyệt';
	$scope.titleBreadcrumb = 'Đơn hàng';
	$scope.titleBread = 'Đã duyệt';
	$scope.stores={};
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 2;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						$http.get("/api/orders/store/" + $scope.stores.id + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
							$scope.page = resp.data;
							$scope.pageNumber = number;
							$scope.pageField = field;
							$scope.pageSort = sort;
						})
					})
			})

	}
	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
			$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);
		})
	}

	$scope.confirm = function(orderid) {
		order = {
			id: orderid,
			status: 2
		}
		$http.put("/api/order/update", order).then(resp => {
			Swal.fire({ icon: 'success', title: 'Đơn hàng đã được duyệt thành công!' });
			$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);
		})
	}



})

app.controller("order__management-success-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = false;
	$scope.titleTable = 'Đơn hàng thành công';
	$scope.titleBreadcrumb = 'Đơn hàng';
	$scope.titleBread = 'Thành công';
	$scope.stores={};
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 3;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						$http.get("/api/orders/store/" + $scope.stores.id + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
							$scope.page = resp.data;
							$scope.pageNumber = number;
							$scope.pageField = field;
							$scope.pageSort = sort;
						})
					})
			})

	}
	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
		})
	}

})
app.controller("order__management-canceled-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = false;
	$scope.titleTable = 'Đơn hàng đã hủy bởi Khách hàng';
	$scope.titleBreadcrumb = 'Đơn hàng';
	$scope.titleBread = 'Đã hủy';
	$scope.stores={};
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 4;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						$http.get("/api/orders/store/" + $scope.stores.id + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
							$scope.page = resp.data;
							$scope.pageNumber = number;
							$scope.pageField = field;
							$scope.pageSort = sort;
						})
					})
			})

	}
	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
		})
	}

})
app.controller("order__management-becanceled-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = false;
	$scope.titleTable = 'Đơn hàng bị hủy do Cửa hàng';
	$scope.titleBreadcrumb = 'Đơn hàng';
	$scope.titleBread = 'Đã bị hủy';
	$scope.stores={};
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 5;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						$http.get("/api/orders/store/" + $scope.stores.id + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
							$scope.page = resp.data;
							$scope.pageNumber = number;
							$scope.pageField = field;
							$scope.pageSort = sort;
						})
					})
			})

	}
	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
		})
	}

})