app.controller("name__store-ctrl", function($scope, $http, $location) {
	$scope.regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
	$scope.titleBread = 'Chi tiết cửa hàng';
	$scope.titleBreadcrumb = 'Thông tin chung'

	$scope.listStoreByStoreId = [];
	$scope.listStoreByUserId = [];

	//get storeid and user id
	

	$scope.init = function() {
	
		$http.get("/api/store/getCurrentStore/" +  $scope.stores.id).then((resp) => {
				
			$scope.listStoreByStoreId = resp.data;
		});

		$http.get("/api/store/list/" + $scope.userid).then((resp) => {
			$scope.listStoreByUserId = resp.data;
		});
	};
	
	//edit list store
	$scope.formStore = {};
	$scope.edit = function(store) {
		
		$scope.formStore = angular.copy(store);
	};

	$scope.init();
	//update
	$scope.update = function() {
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
					//====================================== Bắt đầu xử lý
					var store = angular.copy($scope.listStoreByStoreId);
					var url = $scope.url;
					$http
						.patch("/api/store/" + $scope.stores.id, store)
						.then((resp) => {
							$scope.init();

							// Thông báo
							swalWithBootstrapButtons.fire(
								"Thành công",
								"Cập nhật thành công!",
								"success"
							);
						})
						.catch((error) => {
							// Thông báo
							Swal.fire({
								icon: "error",
								title: "Cập nhật thất bại!",
							});
							console.log("Error", error);
						});
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
				}
			});
	};

	// Create
	$scope.create = function() {
		var store = angular.copy($scope.formStore);
		store.userstoreId = $scope.listStoreByStoreId.userstoreId;
		console.log(store)
		$http
			.post("/api/store/", store)
			.then((resp) => {
				resp.data.create_at = new Date(resp.data.create_at);
				resp.data.update_at = new Date(resp.data.update_at);

				$scope.init();
				Swal.fire({
					icon: "success",
					title: "Thêm thành công!",
				});
			})
			.catch((error) => {
				Swal.fire({
					icon: "error",
					title: "Thêm thất bại!",
				});
				console.log("Error: ", error);
			});
	};

	//detele
	$scope.delete = function(store) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-danger ms-2",
				cancelButton: "btn btn-success",
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: "Thông báo",
				icon: "warning",
				text: "Bạn có chắc muốn thực hiện xóa?",
				showCancelButton: true,
				confirmButtonText: "OK",
				cancelButtonText: "Quay lại",
				reverseButtons: true,
				showClass: {
					popup: "animate__animated animate__fadeInDownBig",
				},
				hideClass: {
					popup: "animate__animated animate__fadeOutUpBig",
				},
			})
			.then((result) => {
				if (result.isConfirmed) {
					//====================================== Bắt đầu xử lý
					store.update_at = new Date();
					store.deleted = true;
					console.log(store)
					$http
						.delete("/api/store/" + store.id, store)
						.then((resp) => {
							var index = $scope.listStoreByStoreId.findIndex(
								(p) => p.id == store.id
							);

							$scope.listStoreByStoreId[index] = store;

							$scope.init();
							// Thông báo
							swalWithBootstrapButtons.fire(
								"Đã xóa",
								"Đã xóa thành công!",
								"success"
							);
						})
						.catch((error) => {
							// Thông báo
							Swal.fire({
								icon: "error",
								title: "Xóa thất bại!",
							});
							console.log("Error", error);
						});
					//====================================== Kết thúc xử lý
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
				}
			});
	};


	$scope.listOrderPack = []
	$scope.orderPackSee = {}

	$scope.loadOrderPack = function() {
		$http.get("/api/orderpackstore/" + $scope.stores.id).then(resp => {
			$scope.listOrderPack = resp.data
		})
	}

	$scope.seemore = function(id) {
		$http.get("/api/orderpackid/" + id).then(resp => {
			$scope.orderPackSee = resp.data
		})
	}


	$scope.orderPack = {}

	$scope.status = 1;
	$scope.listPack = [];
	$scope.loadPack = function() {
		$http.get("/api/pack").then(resp => {
			$scope.listPack = resp.data
		})
	}
	$scope.pagerPack = {
		page: 0,
		size: 4,
		get listPack() {
			var start = this.page * this.size;
			return $scope.listPack.slice(start, start + this.size);
		}
	}

	$scope.loadPack();


	$scope.orderPack = {}

	$scope.registerOrderPack = function(packid) {
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
			text: "Bạn chắc chắn muốn đăng ký gói này?",
			showCancelButton: true,
			confirmButtonText: 'OK',
			cancelButtonText: 'Quay lại',
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				$scope.orderPack = {
					store: { id: $scope.stores.id },
					pack: { id: packid },
					create_at: new Date(),
					status: 1,
				}
				$http.post("/api/orderpack/add", $scope.orderPack).then(resp => {
				})
				swalWithBootstrapButtons.fire(
					'Thành công',
					'Đã đăng ký thành công gói gia hạn!',
					'success'
				)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})

	}

	$scope.cancelOrderPack = function(orderid) {
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
			text: "Bạn chắc chắn hủy đăng ký gói này?",
			showCancelButton: true,
			confirmButtonText: 'OK',
			cancelButtonText: 'Quay lại',
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				order = {
					id: orderid,
					status: 3,
				}
				$http.put("/api/orderpack/update", order).then(resp => {
				})
				swalWithBootstrapButtons.fire(
					'Thành công',
					'Đã đăng ký thành công gói gia hạn!',
					'success'
				)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})

	}

})