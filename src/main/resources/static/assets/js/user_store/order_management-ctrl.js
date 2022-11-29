app.controller("order__management-all-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = true;
	$scope.titleTable = 'Tất cả Đơn hàng';
	$scope.titleBreadcrumb = 'Đơn hàng';
	$scope.titleBread = 'Tất cả';
	$scope.storeid = Number(document.getElementById("storeid").value);
	$scope.keyword
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/order/store/" + $scope.storeid + "/" + number + "/" + field + "/" + sort).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
			$scope.pageField = field;
			$scope.pageSort = sort;
		})

	}
	
	$scope.loadByKey = function() {
		$http.get("/api/findorders/storeandkeyword/" + $scope.storeid + "/" + $scope.keyword).then(resp => {
			$scope.page = resp.data;
		})

	}
	
	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
		})
	}

	$scope.confirm = function(orderid) {
		order = {
			id: orderid,
			status: 2
		}
		$http.put("/api/order/update", order).then(resp => {
			alert("Bạn đã duyệt đơn hàng thành công")
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
			text: "Bạn có chắc muốn thực hiện xóa?",
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
						'Đã xóa',
						'Đã xóa thành công!',
						'success'
					)
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
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 1;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/orders/store/" + $scope.storeid + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
			$scope.pageField = field;
			$scope.pageSort = sort;
		})

	}
	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
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
			text: "Bạn có chắc muốn thực hiện xóa?",
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
						'Đã xóa',
						'Đã xóa thành công!',
						'success'
					)
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
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 2;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/orders/store/" + $scope.storeid + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
			$scope.pageField = field;
			$scope.pageSort = sort;
		})

	}
	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
		})
	}

	$scope.confirm = function(orderid) {
		order = {
			id: orderid,
			status: 2
		}
		$http.put("/api/order/update", order).then(resp => {
			alert("Bạn đã duyệt đơn hàng thành công")
		})
	}



})

app.controller("order__management-success-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = false;
	$scope.titleTable = 'Đơn hàng thành công';
	$scope.titleBreadcrumb = 'Đơn hàng';
	$scope.titleBread = 'Thành công';
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 3;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/orders/store/" + $scope.storeid + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
			$scope.pageField = field;
			$scope.pageSort = sort;
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
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 4;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/orders/store/" + $scope.storeid + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
			$scope.pageField = field;
			$scope.pageSort = sort;
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
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.pageSort = 0;
	$scope.pageField = "Ordercode";
	$scope.page = [];
	$scope.status = 5;
	$scope.orderDetail = [];

	$scope.loadData = function(number, field, sort) {
		$http.get("/api/orders/store/" + $scope.storeid + "/" + $scope.status + "/" + number + "/" + field + "/" + sort).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
			$scope.pageField = field;
			$scope.pageSort = sort;
		})

	}
	$scope.loadData($scope.pageNumber, $scope.pageField, $scope.pageSort);

	$scope.edit = function(id) {
		$http.get("/api/orderdetail/" + id).then(resp => {
			$scope.orderDetail = resp.data;
		})
	}

})