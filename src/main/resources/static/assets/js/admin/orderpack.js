app.controller("order-pack-ctrl", function ($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Gói dịch vụ';
	$scope.titleBread = 'Duyệt gói dịch vụ trong hệ thống';
	$scope.keyword = "";
	$scope.status = 1;
	$scope.showBtn = true;
	$scope.pageNumber = 0;
	$scope.pageField = "orderpackcode";
	$scope.pageSort = 0;
	$scope.page = []
	$scope.orderPack = {}
	$scope.load = function (number, field, sort) {
		$http.get("/api/orderpackall/" + number + "/" + field + "/" + sort).then(resp => {
			$scope.page = resp.data;
			$scope.pageNumber = number;
			$scope.pageField = field;
			$scope.pageSort = sort;

		})
	}

	$scope.find = function () {
		$http.get("/api/orderpackkeyword/" + $scope.keyword).then(resp => {
			$scope.page = resp.data;

		})
	}

	$scope.edit = function (orderpackid) {
		$http.get("/api/orderpackid/" + orderpackid).then(resp => {
			$scope.orderPack = resp.data;
			var date = new Date($scope.orderPack.create_at);
			$scope.dateStr =
				("00" + date.getDate()).slice(-2) + "/" +
				("00" + (date.getMonth() + 1)).slice(-2) + "/" +
				date.getFullYear();
		})
	}

	$scope.confirm = function (orderpackid) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success ms-2',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: 'Thông báo',
			icon: 'warning',
			text: "Bạn chắc chắn muốn thay đổi?",
			showCancelButton: true,
			confirmButtonText: 'OK',
			cancelButtonText: 'Quay lại',
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				$http.get("/api/getUserApp").then(resp => {
					data = {
						id: orderpackid,
						status: 2,
						userapp: { id: resp.data }
					}
					$http.put("/api/orderpack/update", data).then(resp => { 
						$scope.load($scope.pageNumber, $scope.pageField, $scope.pageSort)
					})

					swalWithBootstrapButtons.fire(
						'Thành công',
						'Đã cập nhật thay đổi!',
						'success'
					)
				})
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}

	$scope.becancel = function (orderpackid) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success ms-2',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: 'Thông báo',
			icon: 'warning',
			text: "Bạn chắc chắn muốn thay đổi?",
			showCancelButton: true,
			confirmButtonText: 'OK',
			cancelButtonText: 'Quay lại',
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				data = {
					id: orderpackid,
					status: 4
				}
				$http.put("/api/orderpack/update", data).then(resp => {

					$scope.load($scope.pageNumber, $scope.pageField, $scope.pageSort)
				})
				swalWithBootstrapButtons.fire(
					'Thành công',
					'Đã cập nhật thay đổi!',
					'success'
				)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})

	}

	$scope.load($scope.pageNumber, $scope.pageField, $scope.pageSort)

})