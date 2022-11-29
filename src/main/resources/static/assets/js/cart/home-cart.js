app = angular.module("home-cart", []);
app.controller("cart-ctrl", function($scope, $http, $location) {
	//Header
	$scope.auth = true;
	$scope.amountItems = 0;
	$scope.phone = '0942.xxx.xxx'
	$scope.email = 'anv123@mail.com'
	const queryString = window.location.href;
	$scope.storeid = queryString.split("/").pop();
	$scope.userid = Number(document.getElementById("userid").value);//Chỉ cần lấy id của user trến session gắn dô đây là ok

	$scope.countAmount = function() {
		const storeid = queryString.split("/").pop();
		console.log("countAmount: ", storeid)
		if (storeid != 0 && $scope.userid != 0) {
			$http.get("/api/countcart/" + storeid + "/" + $scope.userid).then(resp => {
				$scope.amountItems = resp.data
			})
		}
	}; 
	$scope.countAmount();

	// Load list products
	$scope.url = "/api/product";
	$scope.products = [];
	$scope.listProducts = function(storeid) {
		storeid = queryString.split("/").pop();
		$http.get($scope.url + "/store/" + storeid + "/" + true).then(resp => {
			$scope.products = resp.data;
		});
	};

	if ($scope.storeid != 0) {
		$scope.listProducts($scope.storeid);
	}

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

	$scope.cateArr = {
		cates: [
			{
				"id": "01",
				"name": "Bánh mì"
			},
			{
				"id": "02",
				"name": "Nước suối"
			},
			{
				"id": "03",
				"name": "Nước ngọt"
			},
			{
				"id": "04",
				"name": "Hamberger"
			},
		]
	}

	// Cart Control
	$scope.items = [];

	$scope.ship = [];

	$scope.payment = [];

	$scope.loadCart = function(storeid, userid) { //lấy danh sách giỏ hàng
		storeid = queryString.split("/").pop();
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
		const storeid = queryString.split("/").pop();
		if (storeid != 0) {
			if ($scope.userid == 0) {
				location.href = "/home/auth/form";
			}else {
			var cart = {
				user: { id: $scope.userid },
				store: { id: storeid },
				product: pd,
				amount: 1
			}
			$http.post("/api/cart/add", cart).then(resp => {
				location.href = "/home/cart/view/" + storeid;
				$scope.loadCart($scope.storeid, $scope.userid)
			});
			}
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
		const storeid = queryString.split("/").pop();
		$http.delete("/api/cart/deleteall/" + storeid + "/" + $scope.userid).then(resp => {

		})
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
					swalWithBootstrapButtons.fire(
						'Đã xóa',
						'Đã xóa sản phẩm!',
						'success'
					)
					$scope.loadCart($scope.storeid, $scope.userid)
				})

			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				$scope.loadCart($scope.storeid, $scope.userid)
			}
		})
	}
	$scope.loadCart($scope.storeid, $scope.userid) // lấy danh sách giỏ hàng

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

	//OrderControl
	$scope.order = {
		user: { id: $scope.userid },
		store: { id: $scope.storeid },
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
				if ($scope.order.fullname === "") {
					alert("Vui lòng nhập người nhận")
				} else if ($scope.order.phone === "") {
					alert("Vui lòng nhập số điện thoại")
				} else if ($scope.order.address === "") {
					alert("Vui lòng nhập địa chỉ")
				} else {
					$http.post("/api/order/add", $scope.order).then(resp => {
					})
					swalWithBootstrapButtons.fire(
						'Thành công',
						'Đơn hàng của bạn đang được xử lý',
						'success'
					)
					$scope.deleteall();
				}

			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}

	// Profile
	//Info
	$scope.updatePhone = function() {
		Swal.fire({
			title: 'Nhập số điện thoại mới',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Xác nhận',
			showLoaderOnConfirm: true,
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Đã cập nhật',
					icon: 'success'
				})
			}
		})
	}

	$scope.updateEmail = function() {
		Swal.fire({
			title: 'Nhập email mới',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Xác nhận',
			showLoaderOnConfirm: true,
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Đã cập nhật',
					icon: 'success'
				})
			}
		})
	}

	$scope.updateProfile = function() {
		Swal.fire({
			icon: 'success',
			title: 'Đã lưu thay đổi',
			showConfirmButton: false,
			timer: 1500
		})
	}

	$scope.orders = [];
	// Order manager
	$scope.all = function() { //lấy tất cả các đơn hàng của khách hàng
		const storeid = queryString.split("/").pop();
		if (storeid != 0) {
			if( $scope.userid==0){
				location.href = "/home/auth/form";
			}
			$http.get("/api/order/" + storeid + "/" + $scope.userid).then(resp => {
				$scope.orders = resp.data;
			})
		}
	}

	$scope.loading = function() { // lấy danh sách đơn hàng đang xử lý
		const storeid = queryString.split("/").pop();
		if (storeid != 0) {
			if( $scope.userid==0){
				location.href = "/home/auth/form";
			}
			$http.get("/api/order/" + storeid + "/" + $scope.userid + "/" + 1).then(resp => {
				$scope.orders = resp.data;
			})
		}
	}

	$scope.shipping = function() { // lấy danh sách đơn hàng đang giao
		const storeid = queryString.split("/").pop();
		if (storeid != 0) {
			if( $scope.userid==0){
				location.href = "/home/auth/form";
			}
			$http.get("/api/order/" + storeid + "/" + $scope.userid + "/" + 2).then(resp => {
				$scope.orders = resp.data;
			})
		}
	}

	$scope.completed = function() { // lấy danh sách đơn hàng đã nhận
		const storeid = queryString.split("/").pop();
		if (storeid != 0) {
			if( $scope.userid==0){
				location.href = "/home/auth/form";
			}
			$http.get("/api/order/" + storeid + "/" + $scope.userid + "/" + 3).then(resp => {
				$scope.orders = resp.data;
			})
		}
	}

	$scope.canceled = function() { // lấy danh sách đơn hàng bị hủy
		const storeid = queryString.split("/").pop();
		if (storeid != 0) {
			if( $scope.userid==0){
				location.href = "/home/auth/form";
			}
			$http.get("/api/order/" + storeid + "/" + $scope.userid + "/" + 4).then(resp => {
				$scope.orders = resp.data;
			})
		}
	}

	$scope.completeOrder = function(idOrder) {
		if( $scope.userid==0){
				location.href = "/home/auth/form";
		}
		or = {
			id: idOrder,
			status: 3
		}
		$http.put("/api/order/update", or).then(resp => {
			alert("Bạn xác nhận đơn hàng thành công")
		})

	}

	$scope.cancelOrder = function(idOrder) {
		if( $scope.userid==0){
				location.href = "/home/auth/form";
			}
		or = {
			id: idOrder,
			status: 4
		}
		$http.put("/api/order/update", or).then(resp => {
			alert("Bạn đã hủy đơn hàng thành công")
		})

	}

	$scope.all();
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