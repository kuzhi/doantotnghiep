app.controller("order__management-all-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = true;
	$scope.titleTable = 'Tất cả hóa đơn';
	$scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Tất cả';
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.page = [];
	$scope.order = {};

	$scope.loadData = function(number) {
		$http.get("/api/order/store/" + $scope.storeid + "/" + number).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
		})

	}
	$scope.loadData($scope.pageNumber);

	$scope.edit = function(id) {
		$http.get("/api/order/get/" + id).then(resp => {
			$scope.order = resp.data;
		})
	}

	$scope.delete = function() {
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
				swalWithBootstrapButtons.fire(
					'Đã xóa',
					'Đã xóa thành công!',
					'success'
				)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}

})

app.controller("order__management-loading-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = true;
	$scope.titleTable = 'Hóa đơn đang chờ duyệt';
	$scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Chờ duyệt';
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.page = [];
	$scope.status = 1;

	$scope.loadData = function(number) {
		$http.get("/api/order/store/" + $scope.storeid + "/" + $scope.status + "/" + number).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
		})

	}
	$scope.loadData($scope.pageNumber)
})

app.controller("order__management-confirmed-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = true;
	$scope.titleTable = 'Hóa đơn đã duyệt';
	$scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Đã duyệt';
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.page = [];
	$scope.status = 2;

	$scope.loadData = function(number) {
		$http.get("/api/order/store/" + $scope.storeid + "/" + $scope.status + "/" + number).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
		})

	}
	$scope.loadData($scope.pageNumber)
})

app.controller("order__management-success-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = false;
	$scope.titleTable = 'Hóa đơn thành công';
	$scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Thành công';
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.page = [];
	$scope.status = 3;

	$scope.loadData = function(number) {
		$http.get("/api/order/store/" + $scope.storeid + "/" + $scope.status + "/" + number).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
		})

	}
	$scope.loadData($scope.pageNumber)
})
app.controller("order__management-canceled-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = false;
	$scope.titleTable = 'Hóa đơn khách đã hủy';
	$scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Đã hủy';
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.page = [];
	$scope.status = 4;

	$scope.loadData = function(number) {
		$http.get("/api/order/store/" + $scope.storeid + "/" + $scope.status + "/" + number).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
		})

	}
	$scope.loadData($scope.pageNumber)
})
app.controller("order__management-becanceled-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = false;
	$scope.titleTable = 'Hóa đơn cửa hàng đã hủy';
	$scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Đã bị hủy';
	$scope.storeid = 2;
	$scope.pageNumber = 0;
	$scope.page = [];
	$scope.status = 5;

	$scope.loadData = function(number) {
		$http.get("/api/order/store/" + $scope.storeid + "/" + $scope.status + "/" + number).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
		})

	}
	$scope.loadData($scope.pageNumber)
})