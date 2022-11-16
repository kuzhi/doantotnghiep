app.controller("name__store-ctrl", function($scope, $http, $location) {
	$scope.regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
	$scope.titleBread = 'Tên và liên hệ';
	$scope.titleBreadcrumb = 'Thông tin cửa hàng'

	$scope.storeid = 2;

	$scope.update = function() {
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
	$scope.status = 1;
	$scope.list = {
		pack: [
			{
				name: 'gói 1 năm',
				price: 200000,
				date: 365,
				image: 'goi1nam.png',
				status: 2
			},
			{
				name: 'gói 1 năm',
				price: 200000,
				date: 365,
				image: 'goi1nam.png',
				status: 1
			},
			{
				name: 'gói 1 năm',
				price: 200000,
				date: 365,
				image: 'goi1nam.png',
				status: 1
			},
			{
				name: 'gói 1 năm',
				price: 200000,
				date: 365,
				image: 'goi1nam.png',
				status: 1
			},
		]
	}


	$scope.listOrderPack = []
	$scope.orderPackSee={}
	$scope.loadOrderPack = function() {
		$http.get("/api/orderpackstore/"+$scope.storeid).then(resp=>{
			$scope.listOrderPack = resp.data
		})
	}
	
	$scope.seemore = function(id) {
		$http.get("/api/orderpackid/"+id).then(resp=>{
				$scope.orderPackSee = resp.data
		})
	}
	

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
					store: { id: $scope.storeid },
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

	$scope.registerOrderPack(2)
	


})