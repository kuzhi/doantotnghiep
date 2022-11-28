app = angular.module("home-cart", []);
app.controller("cart-ctrl", function($scope, $http, $location) {
	//Header
	$scope.auth = false;
	$scope.amountItems = 0;
	$scope.phone = '0942.xxx.xxx'
	$scope.email = 'anv123@mail.com'
	$scope.storeid = 2;// Chỉ cần lấy id của store trến session gắn dô đây là ok
	$scope.userid = 2;//Chỉ cần lấy id của user trến session gắn dô đây là ok

	$scope.countAmount = function() {
		$http.get("/api/countcart/" + $scope.storeid + "/" + $scope.userid).then(resp => {
			$scope.amountItems = resp.data
		})
	}
	$scope.countAmount()
	

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
		$http.get("/api/cart/" + storeid + "/" + userid).then(resp => {
			$scope.items = resp.data
			console.log($scope.items)
		})
	}

	$scope.totalMoney = function() { // lệnh này thì dùng để tính tổng số tiền các mặt hàng trong giỏ
		return $scope.items
			.map(item => item.amount * item.product.price)
			.reduce((total, item) => total += item, 0);
	}

	$scope.add = function(pd) { //thêm sp vào giỏ
		var cart = {
			user: { id: $scope.userid },
			store: { id: $scope.storeid },
			product: pd,
			amount: 1
		}
		$http.post("/api/cart/add", cart).then(resp => {
			location.href = "/home/cart/view";
			$scope.loadCart($scope.storeid, $scope.userid)
		});
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
		$http.delete("/api/cart/deleteall/" + $scope.storeid + "/" + $scope.userid).then(resp => {

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
		$http.get("/api/order/" + $scope.storeid + "/" + $scope.userid).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.loading = function() { // lấy danh sách đơn hàng đang xử lý
		$http.get("/api/order/" + $scope.storeid + "/" + $scope.userid + "/" + 1).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.shipping = function() { // lấy danh sách đơn hàng đang giao
		$http.get("/api/order/" + $scope.storeid + "/" + $scope.userid + "/" + 2).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.completed = function() { // lấy danh sách đơn hàng đã nhận
		$http.get("/api/order/" + $scope.storeid + "/" + $scope.userid + "/" + 3).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.canceled = function() { // lấy danh sách đơn hàng bị hủy
		$http.get("/api/order/" + $scope.storeid + "/" + $scope.userid + "/" + 4).then(resp => {
			$scope.orders = resp.data;
		})
	}

	$scope.completeOrder = function(idOrder) {
		or = {
			id: idOrder,
			status: 3
		}
		$http.put("/api/order/update", or).then(resp => {
			alert("Bạn xác nhận đơn hàng thành công")
		})

	}

	$scope.cancelOrder = function(idOrder) {
		or = {
			id: idOrder,
			status: 4
		}
		$http.put("/api/order/update", or).then(resp => {
			alert("Bạn đã hủy đơn hàng thành công")
		})

	}

	$scope.all();


})