app.controller("product__management-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Sản phẩm';
	$scope.titleBread = 'Danh sách sản phẩm';
	$scope.showBtn = true;
	$scope.url = "/api/product/";
	$scope.urlCate = "/api/category/";

	$scope.insert = function() {
		$scope.showBtn = true;
		$scope.titleTable = 'Thêm món mới';
	}

	// Load list products
	$scope.products = [];
	$scope.categorys = [];
	$scope.init = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						const storeid = $scope.stores.id;

						$http.get($scope.url + "store/" + storeid).then(resp => {
							$scope.products = resp.data;

							$scope.products.forEach(product => {
								product.create_at = new Date(product.create_at)
								product.update_at = new Date(product.update_at)
							})
						});

						$http.get($scope.urlCate + "store/" + storeid).then(resp => {
							$scope.showBtnCate = true;
							$scope.categorys = resp.data;

							$scope.categorys.forEach(category => {
								category.create_at = new Date(category.create_at)
								category.update_at = new Date(category.update_at)
							})
						});
					});
			});
	}

	// Phân trang và điều hướng
	$scope.pager = {
		page: 0,
		size: 10,
		get products() {
			var start = this.page * this.size;
			return $scope.products.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.products.length / this.size);
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

	$scope.pagerCate = {
		page: 0,
		size: 5,
		get cates() {
			var start = this.page * this.size;
			return $scope.categorys.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.categorys.length / this.size);
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

	// Edit product
	$scope.formProduct = {};
	$scope.edit = function(product) {
		$scope.titleTable = 'Cập nhật món';
		$scope.showBtn = false;

		$scope.formProduct = angular.copy(product);
	}

	// Edit category
	$scope.formCate = {};
	$scope.editCate = function(category) {
		$scope.showBtnCate = false;

		$scope.formCate = angular.copy(category);
	}

	// Reset form product
	$scope.reset = function() {
		$scope.formProduct = {
			create_at: null,
			update_at: null,
			image: 'icon_food.png',
			category: {
				id: 1
			},
		};
	}
	$scope.reset();

	//Change image
	$scope.ImageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/api/upload/Products', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			// console.log('data: ', resp.data)
			$scope.formProduct.image = resp.data.name;
		}).catch(error => {
			alert("Lỗi tải hình ảnh")
			// console.log('error: ', error)
		})
	}

	// Create product
	$scope.create = function() {
		var category = document.querySelector("#selectCbbL").value;
		$scope.formProduct.category.id = JSON.parse(category);
		var product = angular.copy($scope.formProduct);

		product.create_at = new Date();
		product.update_at = new Date();
		product.deleted = false;

		// console.log('data: ', product);

		$http.post($scope.url, product).then(resp => {
			resp.data.create_at = new Date(resp.data.create_at)
			resp.data.update_at = new Date(resp.data.update_at)

			$scope.products.push(resp.data);
			$scope.reset();
			$scope.init();
			Swal.fire({
				icon: 'success',
				title: 'Thêm thành công!'
			});
		}).catch(error => {

			Swal.fire({
				icon: 'error',
				title: 'Thêm thất bại!'
			});
			console.log("Error: ", error);
		});
	}

	// Create and update category
	$scope.showBtnCate = true;
	$scope.createCate = function() {
		var cate = angular.copy($scope.formCate);

		// console.log('data: ', cate);
		if (cate.id != null) {
			// ============= Update
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
				text: "Bạn có chắc muốn thực hiện?",
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

					//====================================== Bắt đầu xử lý
					cate.update_at = new Date();

					$http.put($scope.urlCate + cate.id, cate)
						.then(resp => {
							var index = $scope.categorys.findIndex(c => c.id == cate.id);

							$scope.categorys[index] = cate;

							$scope.formCate = {
								create_at: null,
								update_at: null,
							};
							$scope.reset();
							$scope.init();

							// Thông báo
							swalWithBootstrapButtons.fire(
								'Thành công',
								'Cập nhật thành công!',
								'success'
							)

						}).catch(error => {
							// Thông báo
							Swal.fire({
								icon: 'error',
								title: 'Cập nhật thất bại!'
							});
							console.log("Error", error);
						});
					//====================================== Kết thúc xử lý
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) { }
			})
		} else {
			// ============= Create
			// Lấy userid
			$http.get("/api/get")
				.then(resp => {
					$scope.userid = resp.data;
					// Lấy storeid
					$http.get("/api/store/list/" + $scope.userid)
						.then(resp => {
							$scope.stores = resp.data[0];
							const storeid = $scope.stores.id;

							cate.create_at = new Date();
							cate.update_at = new Date();
							cate.deleted = false;

							$http.post($scope.urlCate + "store/" + storeid, cate).then(resp => {
								resp.data.create_at = new Date(resp.data.create_at)
								resp.data.update_at = new Date(resp.data.update_at)

								$scope.categorys.push(resp.data);
								// console.log('data: ', $scope.categorys);    

								$scope.formCate = {
									create_at: null,
									update_at: null,
								};
								$scope.reset();
								$scope.init();

								Swal.fire({
									icon: 'success',
									title: 'Thêm thành công!'
								});
							}).catch(error => {

								Swal.fire({
									icon: 'error',
									title: 'Thêm thất bại!'
								});
								console.log("Error: ", error);
							});
						});
				});
		}


	}

	// Update product
	$scope.update = function() {
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
			text: "Bạn có chắc muốn thực hiện?",
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

				//====================================== Bắt đầu xử lý
				var category = document.querySelector("#selectCbbL").value;
				$scope.formProduct.category.id = JSON.parse(category);

				var product = angular.copy($scope.formProduct);
				product.update_at = new Date();

				// console.log("data: ", product);

				$http.put($scope.url + product.id, product).then(resp => {
					var index = $scope.products.findIndex(p => p.id == product.id);

					$scope.products[index] = product;
					// console.log("Sp: ", $scope.products[index]);
					$scope.reset();
					$scope.init();

					// Thông báo
					swalWithBootstrapButtons.fire(
						'Thành công',
						'Cập nhật thành công!',
						'success'
					)

				}).catch(error => {
					// Thông báo
					Swal.fire({
						icon: 'error',
						title: 'Cập nhật thất bại!'
					});
					console.log("Error", error);
				});
				//====================================== Kết thúc xử lý
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}

	// Delete product
	$scope.delete = function(product) {
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

				//====================================== Bắt đầu xử lý
				product.update_at = new Date();
				product.deleted = true;

				// console.log("data: ", product);

				$http.put($scope.url + product.id, product).then(resp => {
					var index = $scope.products.findIndex(p => p.id == product.id);

					$scope.products[index] = product;

					$scope.reset();
					$scope.init();
					// Thông báo
					swalWithBootstrapButtons.fire(
						'Đã xóa',
						'Đã xóa thành công!',
						'success'
					)
				})
					.catch(error => {
						// Thông báo
						Swal.fire({
							icon: 'error',
							title: 'Xóa thất bại!'
						});
						console.log("Error", error);
					});
				//====================================== Kết thúc xử lý
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}

	// Delete cate
	$scope.deleteCate = function(cate) {
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

				//====================================== Bắt đầu xử lý
				cate.update_at = new Date();
				cate.deleted = true;

				$http.put($scope.urlCate + cate.id, cate).then(resp => {
					var index = $scope.categorys.findIndex(c => c.id == cate.id);

					$scope.categorys[index] = cate;

					$scope.formCate = {
						create_at: null,
						update_at: null,
					};
					$scope.reset();
					$scope.init();
					// Thông báo
					swalWithBootstrapButtons.fire(
						'Đã xóa',
						'Đã xóa thành công!',
						'success'
					)
				})
					.catch(error => {
						// Thông báo
						Swal.fire({
							icon: 'error',
							title: 'Xóa thất bại!'
						});
						console.log("Error", error);
					});
				//====================================== Kết thúc xử lý
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}

	// Find by name product
	$scope.nameProduct = "";
	$scope.findByName = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/store/list/" + $scope.userid)
					.then(resp => {
						$scope.stores = resp.data[0];
						const storeid = $scope.stores.id;
						if($scope.nameProduct == ""){
							$scope.init();
						}else{
							$http.get($scope.url + $scope.nameProduct + "/" + storeid).then(resp => {
								$scope.products = resp.data;
		
								$scope.products.forEach(product => {
									product.create_at = new Date(product.create_at)
									product.update_at = new Date(product.update_at)
								})
		
								// console.log("Sp: ", resp.data);
							}).catch(error => {
								console.log("Error", error);
							});
						}
					});
			});
	}

	// Load list product by filter
	$scope.listFilter = [
		{ id: 1, name: "Sắp xếp theo tên A-Z" },
		{ id: 2, name: "Sắp xếp theo tên Z-A" },
		{ id: 3, name: "Sắp xếp theo giá 0-9" },
		{ id: 4, name: "Sắp xếp theo giá 9-0" },
	]
	$scope.getProductsbyFilter = function() {
		// ======= A-Z
		if ($scope.list == 1) {
			// Lấy userid
			$http.get("/api/get")
				.then(resp => {
					$scope.userid = resp.data;
					// Lấy storeid
					$http.get("/api/store/list/" + $scope.userid)
						.then(resp => {
							$scope.stores = resp.data[0];
							const storeid = $scope.stores.id;
							$http.get($scope.url + "sort/a-z/" + storeid)
								.then(resp => {
									$scope.products = resp.data;
									$scope.products.forEach(product => {
										product.create_at = new Date(product.create_at)
										product.update_at = new Date(product.update_at)
									})
								});
						});
				});
		}
		// ======= Z-A
		else if ($scope.list == 2) {
			// Lấy userid
			$http.get("/api/get")
				.then(resp => {
					$scope.userid = resp.data;
					// Lấy storeid
					$http.get("/api/store/list/" + $scope.userid)
						.then(resp => {
							$scope.stores = resp.data[0];
							const storeid = $scope.stores.id;
							$http.get($scope.url + "sort/z-a/" + storeid)
								.then(resp => {
									$scope.products = resp.data;

									$scope.products.forEach(product => {
										product.create_at = new Date(product.create_at)
										product.update_at = new Date(product.update_at)
									})
								});
						});
				});
		}
		// ======= 0-9
		else if ($scope.list == 3) {
			// Lấy userid
			$http.get("/api/get")
				.then(resp => {
					$scope.userid = resp.data;
					// Lấy storeid
					$http.get("/api/store/list/" + $scope.userid)
						.then(resp => {
							$scope.stores = resp.data[0];
							const storeid = $scope.stores.id;
							$http.get($scope.url + "sort/0-9/" + storeid)
								.then(resp => {
									$scope.products = resp.data;

									$scope.products.forEach(product => {
										product.create_at = new Date(product.create_at)
										product.update_at = new Date(product.update_at)
									})
								});
						});
				});
		}
		// ======= 9-0
		else if ($scope.list == 4) {
			// Lấy userid
			$http.get("/api/get")
				.then(resp => {
					$scope.userid = resp.data;
					// Lấy storeid
					$http.get("/api/store/list/" + $scope.userid)
						.then(resp => {
							$scope.stores = resp.data[0];
							const storeid = $scope.stores.id;
							$http.get($scope.url + "sort/9-0/" + storeid)
								.then(resp => {
									$scope.products = resp.data;

									$scope.products.forEach(product => {
										product.create_at = new Date(product.create_at)
										product.update_at = new Date(product.update_at)
									})
								});
						});
				});
		}
	}
})