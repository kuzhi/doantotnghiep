app = angular.module("app-user-store", ["ngRoute"]);

// Định tuyến trang admin chủ cửa hàng
app.config(function($routeProvider) {
	$routeProvider
		// Thông tin cửa hàng

		.when("/myProfile", {
			templateUrl: "/assets/user_store/info_store/my-profile.html",
			controller: "myprofile-ctrl"
		})
		// Sản phẩm
		.when("/product__management", {
			templateUrl: "/assets/user_store/manage/product_management.html",
			controller: "product__management-ctrl"
		}).when("/name__store", {
			templateUrl: "/assets/user_store/info_store/name_store.html",
			controller: "name__store-ctrl",
		})
		// Đơn hàng
		.when("/order__management-all", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-all-ctrl"
		})
		.when("/order__management-loading", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-loading-ctrl"
		})
		.when("/order__management-confirmed", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-confirmed-ctrl"
		})
		.when("/order__management-success", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-success-ctrl"
		})
		.when("/order__management-canceled", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-canceled-ctrl"
		})
		.when("/order__management-becanceled", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-becanceled-ctrl"
		})
		// Nhân viên
		//.when("/user__management", {
		//templateUrl: "/assets/user_store/manage/user_management.html",
		//controller: "user__management-ctrl"
		//})
		// Báo cáo
		.when("/report-all", {
			templateUrl: "/assets/user_store/manage/report.html",
			controller: "report-all-ctrl"
		})
		.when("/report-sale-all", {
			templateUrl: "/assets/user_store/manage/report-sale.html",
			controller: "report-sale-ctrl"
		})
		.when("/report-product-all", {
			templateUrl: "/assets/user_store/manage/report-product.html",
			controller: "report-product-ctrl"
		})
		.when("/report-client-all", {
			templateUrl: "/assets/user_store/manage/report-client.html",
			controller: "report-client-ctrl"
		})
		.otherwise({
			templateUrl: "/assets/user_store/manage/report.html",
			controller: "report-all-ctrl"
		})
}

);

app.controller("app-ctrl", function($scope, $http, $location, $q) {
	// Láy userid

	$scope.userid = 0;
	$scope.stores = [];




	$scope.getEmpleadoInfo = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				var def = $q.defer();
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						$http.post("/api/storeToken", $scope.stores.id).then(resp => {
							def.resolve(
								$http.get("/api/getStoreToken").then(resp => {
									const storeid = resp.data;


									$http.get("/api/check-status/order/" + storeid + "/1")
									.then(resp => {
										$scope.checkOrder = resp.data;
										if($scope.checkOrder > 0) {
											Swal.fire({
												icon: 'warning',
												title: 'Bạn có đơn hàng mới!'
											});
										}
									})
									$http.get("/api/store/notification/" + storeid).then(resp => {
										$scope.notis = resp.data;
										if ($scope.notis.notes == null) {

											$scope.notis.notes = "Không có thông báo nào"
										}
									})

								})
							)
						});
					})
				$http.get("/api/user/get-user-store/" + $scope.userid).then(resp => {
					$scope.userStore = resp.data;
				})
				$http.get("/api/store/list/" + $scope.userid).then((resp) => {
					$scope.listStoreByUserId = resp.data;

				})
				$http.get("/api/support/findUserAppByUserStore/" + $scope.userid).then((resp) => {
					$scope.userApp = resp.data;
					if($scope.userApp.phone != null) {
						$scope.userApp.phone =
						$scope.userApp.phone.substr(0, 3) +
						"-" +
						$scope.userApp.phone.substr(3, 3) +
						"-" +
						$scope.userApp.phone.substr(6, 4);
					}
				})


			})

	}; $scope.getEmpleadoInfo();
	$scope.click = function() {
		$scope.stores = $scope.formSupport;
		if ($scope.formSupport) {
			$http.post("/api/storeToken", $scope.formSupport.id);

		}
		else {
			$scope.getEmpleadoInfo()
		}

	}
	$scope.create = function() {
		let data = {
			status: false,
			userStore: $scope.userStore,
			create_at: new Date(),
			userApp: $scope.userApp,
			notes: "Cửa hàng " + $scope.stores.name + " bị lỗi thuộc người dùng " + $scope.userStore.username,
		}
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success ms-2",
				cancelButton: "btn btn-danger",
			},
			buttonsStyling: false,
		});
		swalWithBootstrapButtons
			.fire({
				title: "Thông báo",
				icon: "warning",
				text: "Bạn chắc chắn muốn thay đổi?",
				showCancelButton: true,
				confirmButtonText: "OK",
				cancelButtonText: "Quay lại",
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					$http.post("/api/support", data).then((resp) => {
						if (resp.data) {
							console.log(data)
							// Thông báo
							swalWithBootstrapButtons.fire(
								"Thành công",
								"Gọi hỗ trợ thành công!",
								"success"
							);
						}
					})
						.catch((error) => {
							// Thông báo
							Swal.fire({
								icon: "error",
								title: "Gọi hỗ trợ thất bại!",
							});
							console.log("Error", error);
						});

				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
				}
			})
	}
});