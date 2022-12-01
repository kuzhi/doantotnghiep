app = angular.module("home-cart", []);
app.controller("cart-ctrl", function($scope, $http, $location) {
	//================================Header
	$scope.amountItems = 0;
	$scope.userid = Number(document.getElementById("userid").value);
	$scope.sid = Number(document.getElementById("storeid").value);
	$scope.regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

	$scope.countAmount = function(storeid) {
		if (storeid != 0 && $scope.userid != 0) {
			$http.get("/api/countcart/" + storeid + "/" + $scope.userid).then(resp => {
				$scope.amountItems = resp.data
			})
		}
	}; $scope.countAmount($scope.sid);

	$scope.loadTitleStore = function() {
		$scope.sid;
		$http.get("/api/store/" + $scope.sid).then(resp => {
			$scope.titleStore = resp.data;
		})
	}; $scope.loadTitleStore();

	//================================ Load list products
	$scope.url = "/api/product";
	$scope.products = [];
	$scope.listProducts = function(storeid) {
		$http.get($scope.url + "/store/" + $scope.sid + "/" + true).then(resp => {
			$scope.products = resp.data;
		});
	}; $scope.listProducts($scope.storeid);

	// Phân trang và điều hướng
	$scope.pager2 = {
		page: 0,
		size: 8,
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
	};

	//================================ Load loại để lọc
	$scope.listProducts();
	$scope.cates = [];
	$scope.listCategory = function() {
		$http.get("/api/category/" + "store/" + $scope.sid).then(resp => {
			$scope.cates = resp.data;
		});
	}
	$scope.listCategory();
	//Sort
	$scope.sortBy = function(propertyName) {
		$scope.propertyName = propertyName;
	};

	$scope.sortByCate = function(cate) {
		$scope.cate = cate;
		console.log($scope.cate)
	};
	//================================ Cart Control
	$scope.items = [];

	$scope.ship = [];

	$scope.payment = [];

	$scope.loadCart = function(storeid, userid) { //lấy danh sách giỏ hàng
		if ($scope.userid == 0) {
			location.href = "/home/auth/form";
		} else if (storeid != 0 && userid != 0) {
			$http.get("/api/cart/" + storeid + "/" + userid).then(resp => {
				$scope.items = resp.data
			})
		}
	}

	$scope.totalMoney = function() { // lệnh này thì dùng để tính tổng số tiền các mặt hàng trong giỏ
		return $scope.items
			.map(item => item.amount * item.product.price)
			.reduce((total, item) => total += item, 0);
	}

	$scope.add = function(pd) { //thêm sp vào giỏ
		if ($scope.userid == 0) {
			location.href = "/home/auth/form";
		} else {
			var cart = {
				user: { id: $scope.userid },
				store: { id: $scope.sid },
				product: pd,
				amount: 1
			}
			$http.post("/api/cart/add", cart).then(resp => {
				location.href = "/home/cart/view/" + $scope.sid;
				$scope.loadCart($scope.storeid, $scope.userid)
			});
		}
	}

	$scope.update = function(cart) { // cập nhật lại số lượng
		if (cart.amount > 0) {
			$http.put("/api/cart/update", cart).then(resp => {
			});
		} else {
			$scope.delete(cart.id)
		}

	}

	$scope.deleteall = function() { //xóa hết sp trong giỏ
		$http.delete("/api/cart/deleteall/" + $scope.sid + "/" + $scope.userid).then(resp => { })
		$scope.loadCart($scope.storeid, $scope.userid)
	}

	$scope.delete = function(id) { // xóa sp khỏi giỏ
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
			text: "Bạn có chắc muốn xóa sản phẩm này?",
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
				$http.delete("/api/cart/delete/" + id).then(resp => {
					swalWithBootstrapButtons.fire('Đã xóa', 'Đã xóa sản phẩm!', 'success')
					$scope.loadCart($scope.sid, $scope.userid)
					$scope.countAmount($scope.sid);
				})

			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				$scope.loadCart($scope.sid, $scope.userid)
			}
		})
	}
	$scope.loadCart($scope.sid, $scope.userid) // lấy danh sách giỏ hàng

	$scope.loadShip = function() { //lấy danh sách các loại thanh toán
		$http.get("/api/shipping").then(resp => {
			$scope.ship = resp.data
		})
	}

	$scope.loadShip()//lấy danh sách các loại ship

	$scope.loadPayment = function() { //lấy danh sách các loại thanh toán
		$http.get("/api/payment").then(resp => {
			$scope.payment = resp.data
		})
	}

	$scope.loadPayment()//lấy danh sách các loại thanh toán

	//================================ OrderControl
	$scope.order = {
		user: { id: $scope.userid },
		store: { id: $scope.sid },
		status: 1,
		fullname: "",
		address: "",
		phone: "",
		paymentType: {},
		shippingType: {},
		create_at: new Date(),
		update_at: null,
		deleted: false,
		get orderDetail() {
			return $scope.items.map(item => {//lệnh này thì lấy cái đống dữ liệu trong mảng item để mình tạo ra cái list chi tiết đơn hàng
				return {
					product: item.product,
					amount: item.amount
				}
			})
		}
	}

	$scope.pay = function() { //đặt hàng
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success ms-2',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: 'Đặt hàng',
			text: "Bạn có chắc muốn đặt hàng?",
			showCancelButton: true,
			confirmButtonText: 'OK',
			cancelButtonText: 'Quay lại',
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				var phoneCheck = $scope.order.phone.match($scope.regexPhone);
				var getSelectedValuePay = document.querySelector('input[name="payment"]:checked');
				var getSelectedValueShip = document.querySelector('input[name="shipping"]:checked');

				if ($scope.order.fullname === "") {
					swalWithBootstrapButtons.fire('Thông báo', 'Vui lòng cung cấp tên người nhận!', 'warning');
				} else if ($scope.order.fullname.length < 4) {
					swalWithBootstrapButtons.fire('Thông báo', 'Tên của bạn phải từ 3 ký tự!', 'warning');
				} else if ($scope.order.phone === "") {
					swalWithBootstrapButtons.fire('Thông báo', 'Vui lòng cung cấp số điện thoại nhận hàng!', 'warning');
				} else if (phoneCheck == null) {
					swalWithBootstrapButtons.fire('Thông báo', 'Số điện thoại không hợp lệ!', 'warning');
				} else if ($scope.order.address === "") {
					swalWithBootstrapButtons.fire('Thông báo', 'Vui lòng cung cấp số địa chỉ nhận hàng!', 'warning');
				} else if ($scope.order.address.length < 4) {
					swalWithBootstrapButtons.fire('Thông báo', 'Địa chỉ của bạn phải từ 3 ký tự!', 'warning');
				} else if (getSelectedValuePay == null) {
					swalWithBootstrapButtons.fire('Thông báo', 'Vui lòng chọn PTTT!', 'warning');
				} else if (getSelectedValueShip == null) {
					swalWithBootstrapButtons.fire('Thông báo', 'Vui lòng chọn HTNH!', 'warning');
				} else {
					$http.post("/api/order/add", $scope.order).then(resp => {
						$scope.loadCart($scope.sid, $scope.userid)
						swalWithBootstrapButtons.fire('Thành công', 'Đơn hàng của bạn đang được xử lý', 'success');
						$scope.all();
						$scope.deleteall();
						$scope.countAmount($scope.sid);
					})
				}

			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}

	//================================ Profile
	$scope.myProfile = {};
	$scope.urlInfo = "/api/user/";
	$scope.loadProfile = function() {
		$http.get("/api/user/userid/" + $scope.userid).then(resp => {
			$scope.myProfile = resp.data;
			$scope.myProfile.birthday = new Date($scope.myProfile.birthday);
		})
	}; $scope.loadProfile();

	//Edit
	$scope.resetProfile = function() {
		$scope.formUser = {};
		// Set độ tuổi
		const now = new Date();
		$scope.valueAge = new Date(); $scope.valueAge.setMonth(0); $scope.valueAge.setFullYear(now.getFullYear() - 17);
		$scope.maxAge = new Date(); $scope.maxAge.setFullYear(now.getFullYear() - 17);
		$scope.formatDate = function(date) {
			var d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2)
				month = '0' + month;
			if (day.length < 2)
				day = '0' + day;

			return [year, month, day].join('-');
		}; $scope.formatDate($scope.maxAge);
	}; $scope.resetProfile();

	//Change image
	$scope.ImageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/api/upload/User', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			// console.log('data: ', resp.data)
			$scope.myProfile.photo = resp.data.name;
		}).catch(error => {
			alert("Lỗi tải hình ảnh")
			console.log('error: ', error)
		})
	};

	// Update info
	$scope.updateProfile = function() {
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
				var user = angular.copy($scope.myProfile);
				user.update_at = new Date();

				// Nếu email và sdt thuộc user thì update
				$http.get($scope.urlInfo + "email/" + user.email + "/" + user.id).then(resp => {
					const myEmail = resp.data;
					// tìm ra thì tìm sdt
					if (myEmail.length != 0) {
						$http.get($scope.urlInfo + "phone/" + user.phone + "/" + user.id).then(resp => {
							const myPhone = resp.data;
							// tìm ra thì cập nhật
							if (myPhone.length != 0) {
								$scope.updateReal(user);
							} else { // tìm k ra thì check trùng
								// Check phone
								$http.get($scope.urlInfo + "phone/" + user.phone).then(resp => {
									const checkPhone = resp.data;
									if (checkPhone.length != 0) {
										Swal.fire({ icon: 'warning', title: 'Số điện thoại "' + user.phone + '" đã tồn tại!' });
									} else { // neu phone moi k trung thi update
										$scope.updateReal(user);
									}
								}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
							}
						}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
					} else { // tìm k ra thì check trùng
						// Check email
						$http.get($scope.urlInfo + "email/" + user.email).then(resp => {
							const checkEmail = resp.data;
							if (checkEmail.length != 0) {
								Swal.fire({ icon: 'warning', title: 'Email "' + user.email + '" đã tồn tại!' });
							} else {
								$http.get($scope.urlInfo + "phone/" + user.phone + "/" + user.id).then(resp => {
									const myPhone = resp.data;
									// tìm ra thì cập nhật
									if (myPhone.length != 0) {
										$scope.updateReal(user);
									} else { // tìm k ra thì check trùng
										// Check phone
										$http.get($scope.urlInfo + "phone/" + user.phone).then(resp => {
											const checkPhone = resp.data;
											if (checkPhone.length != 0) {
												Swal.fire({ icon: 'warning', title: 'Số điện thoại "' + user.phone + '" đã tồn tại!' });
											} else { // neu phone moi k trung thi update
												$scope.updateReal(user);
											}
										}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
									}
								}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
							}
						}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
					}
					$http.get($scope.url + "phone/" + user.phone + "/" + user.id).then(resp => {



					}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
					// Ngược lại email và sdt không thuộc user thì báo lỗi
				}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
				//====================================== Kết thúc xử lý
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}
	$scope.updateReal = function(user) {
		$http.put($scope.urlInfo + user.id, user).then(resp => {

			$scope.myProfile = user;
			//console.log("Sp: ", $scope.userStore);

			// Thông báo
			Swal.fire({
				icon: 'success',
				title: 'Cập nhật thành công!'
			})

		}).catch(error => {
			// Thông báo
			Swal.fire({
				icon: 'error',
				title: 'Cập nhật thất bại!'
			});
			console.log("Error", error);
		});
	}

	//================================ Order manager
	$scope.orders = [];
	$scope.all = function() { //lấy tất cả các đơn hàng của khách hàng
		if ($scope.userid == 0) {
			location.href = "/home/auth/form";
		}
		$http.get("/api/order/" + $scope.sid + "/" + $scope.userid).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.loading = function() { // lấy danh sách đơn hàng đang xử lý
		if ($scope.userid == 0) {
			location.href = "/home/auth/form";
		}
		$http.get("/api/order/" + $scope.sid + "/" + $scope.userid + "/" + 1).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.shipping = function() { // lấy danh sách đơn hàng đang giao
		if ($scope.userid == 0) {
			location.href = "/home/auth/form";
		}
		$http.get("/api/order/" + $scope.sid + "/" + $scope.userid + "/" + 2).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.completed = function() { // lấy danh sách đơn hàng đã nhận
		if ($scope.userid == 0) {
			location.href = "/home/auth/form";
		}
		$http.get("/api/order/" + $scope.sid + "/" + $scope.userid + "/" + 3).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.canceled = function() { // lấy danh sách đơn hàng bị hủy
		if ($scope.userid == 0) {
			location.href = "/home/auth/form";
		}
		$http.get("/api/order/" + $scope.sid + "/" + $scope.userid + "/" + 4).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.completeOrder = function(idOrder) {
		if ($scope.userid == 0) {
			location.href = "/home/auth/form";
		}
		or = {
			id: idOrder,
			status: 3
		}
		$http.put("/api/order/update", or).then(resp => {
			swal.fire('Thành công', 'Đơn hàng đã được xác nhận!', 'success')
		})

	}

	$scope.cancelOrder = function(idOrder) {
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
			text: "Bạn có chắc muốn hủy đơn?",
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
				if ($scope.userid == 0) {
					location.href = "/home/auth/form";
				}
				or = {
					id: idOrder,
					status: 4
				}
				$http.put("/api/order/update", or).then(resp => {
					swalWithBootstrapButtons.fire(
						'Thành công',
						'Đơn hàng đã được hủy!',
						'success'
					)
				})
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				$scope.loadCart($scope.sid, $scope.userid)
			}
		})
	}

	$scope.all();

	//================================ Load danh sách cửa hàng
	$scope.listStore = [];
	$http.get("/api/store")
		.then(resp => {
			$scope.listStore = resp.data;
			$scope.listStore.forEach(store => {
				store.phone = store.phone.substr(0, 3) + '-' + store.phone.substr(3, 3) + '-' + store.phone.substr(6, 4);
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