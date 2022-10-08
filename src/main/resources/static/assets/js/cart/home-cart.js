app = angular.module("home-cart", []);
app.controller("cart-ctrl", function($scope, $http, $location) {
	//Header
	$scope.auth = true;
	$scope.amountItems = 34;
	$scope.phone = '0942.xxx.xxx'
	$scope.email = 'anv123@mail.com'
	
	// list product
	$scope.titleStore = 'Chickens gang'
	$scope.favorite = false;
	$scope.arr1 = {
		products: [
			{
				id: '01',
				name: 'Sản phẩm 1',
				price: 100000,
				discount: 20,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 100,
				image: 'sp1.jpg'
			},
			{
				id: '02',
				name: 'Sản phẩm 2',
				price: 50000,
				discount: 17.5,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 100,
				image: 'sp3.jpeg'
			},
			{
				id: '03',
				name: 'Sản phẩm 3',
				price: 199000,
				discount: 27,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 100,
				image: 'sp4.jpeg'
			},
			{
				id: '01',
				name: 'Sản phẩm 1',
				price: 100000,
				discount: 20,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 100,
				image: 'sp1.jpg'
			},
			{
				id: '02',
				name: 'Sản phẩm 2',
				price: 50000,
				discount: 17.5,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 100,
				image: 'sp3.jpeg'
			},
			{
				id: '03',
				name: 'Sản phẩm 3',
				price: 199000,
				discount: 27,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 100,
				image: 'sp4.jpeg'
			},
			{
				id: '01',
				name: 'Sản phẩm 1',
				price: 100000,
				discount: 20,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 100,
				image: 'sp1.jpg'
			},
			{
				id: '02',
				name: 'Sản phẩm 2',
				price: 50000,
				discount: 17.5,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 100,
				image: 'sp3.jpeg'
			}
		]
	}
	
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
	
	// product detail
	$scope.arr2 = {
		products2: [
			{
				id: '01',
				name: 'Sản phẩm 1',
				price: 10000000000000000,
				discount: 20,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 1,
				image: 'sp1.jpg'
			},
			{
				id: '02',
				name: 'Sản phẩm 2',
				price: 50000,
				discount: 17.5,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 1,
				image: 'sp3.jpeg'
			},
			{
				id: '03',
				name: 'Sản phẩm 3',
				price: 199000,
				discount: 27,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 1,
				image: 'sp4.jpeg'
			},
			{
				id: '01',
				name: 'Sản phẩm 1',
				price: 100000,
				discount: 20,
				description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				amount: 1,
				image: 'sp1.jpg'
			}
		],
		amount: 10000000,
		ship: 0,
		total: 10000000
	}
	
	//Cart
	$scope.number = 1;
	
	$scope.pay = function(){
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
				swalWithBootstrapButtons.fire(
					'Thành công',
					'Đơn hàng của bạn đang được xử lý',
					'success'
				)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			){}
		})
	}
	
	$scope.delete = function(){
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
				swalWithBootstrapButtons.fire(
					'Đã xóa',
					'Đã xóa sản phẩm!',
					'success'
				)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			){}
		})
	}
	
	// Profile
	$scope.showI = true
	$scope.showA = false
	$scope.showO = false
	$scope.showV = false
	
	$scope.showInfo = function() {
		$scope.showI = true
		$scope.showA = false
		$scope.showO = false
		$scope.showV = false
	}
	$scope.showAddress = function() {
		$scope.showI = false
		$scope.showA = true
		$scope.showO = false
		$scope.showV = false
	}
	$scope.showOrder = function() {
		$scope.showI = false
		$scope.showA = false
		$scope.showO = true
		$scope.showV = false
	}
	$scope.showVoucher = function() {
		$scope.showI = false
		$scope.showA = false
		$scope.showO = false
		$scope.showV = true
	}
	
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
	
	// Address
	$scope.addressArr = {
		myAddress: [
			{
				"name": 'Nguyễn Văn A',
				"address": 'Cà Mau',
				"phone": '0942.xxx.xxx',
				"status": true			
			},
			{
				"name": 'Nguyễn Văn A',
				"address": 'Cần Thơ',
				"phone": '0329.xxx.xxx',
				"status": false				
			},
			{
				"name": 'Nguyễn Văn A',
				"address": 'Tp.HCM',
				"phone": '0942.xxx.xxx',
				"status": false			
			}
		]
	}
	
	$scope.editAddress = function() {
		$scope.titleModal = 'Cập nhật địa chỉ'
	}
	$scope.addAddress = function() {
		$scope.titleModal = 'Thêm địa chỉ mới'
	}
	$scope.updateAddress = function() {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success ms-2',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})
		
		swalWithBootstrapButtons.fire({
			icon: 'info',
			text: "Lưu thay đổi?",
			showCancelButton: true,
			confirmButtonText: 'OK',
			cancelButtonText: 'Quay lại',
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				swalWithBootstrapButtons.fire(
					'Thành công',
					'Đã cập nhật',
					'success'
				)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			){}
		})
	}
	
	//Voucher
	$scope.allV = true
	$scope.myV = false
	$scope.maxV = false
	
	$scope.allVoucher = function() {
		$scope.allV = true
		$scope.myV = false
		$scope.maxV = false
	} 
	
	$scope.myVoucher = function() {
		$scope.allV = false
		$scope.myV = true
		$scope.maxV = false
	}
	
	$scope.maxVoucher = function() {
		$scope.allV = false
		$scope.myV = false
		$scope.maxV = true
	}
	
	$scope.voucherArr = {
		all: [
			{
				"id": '1',
				"name": 'Giảm 30k',
				"code": 'HELLOCHICKENSGANG'
			},
			{
				"id": '2',
				"name": 'Giảm 120k',
				"code": 'TRIANTHANG10'
			},
			{
				"id": '3',
				"name": 'Giảm 50k',
				"code": 'HELLOCANTHO'
			},
			{
				"id": '4',
				"name": 'Giảm 10k',
				"code": 'HELLOCG'
			},
		],
		my: [
			{
				"id": '1',
				"name": 'Giảm 30k',
				"code": 'HELLOCHICKENSGANG'
			},
			{
				"id": '4',
				"name": 'Giảm 10k',
				"code": 'HELLOCG'
			},
		],
		max: [
			{
				"id": '2',
				"name": 'Giảm 120k',
				"code": 'TRIANTHANG10'
			},
			{
				"id": '3',
				"name": 'Giảm 50k',
				"code": 'HELLOCANTHO'
			}
		]
	}
	
	$scope.showBtnSave = true
	$scope.saveVoucher = function() {
		$scope.showBtnSave = false
	}
	
	// Order manager
	$scope.statusArr = {
		statusOrder: [
			{
				id: 1,
				name: 'Đang xử lý'
			},
			{
				id: 2,
				name: 'Đang giao'
			},
			{
				id: 3,
				name: 'Giao hàng thành công'
			},
			{
				id: 4,
				name: 'Đã hủy'
			}
		]
	}
	
	$scope.order = {
		myOrder: [
			{
				id: 'DH100001',
				quantily: 1,
				price: 15000000,
				sales: 10,
				status: 1,
				ship: 0
			},
			{
				id: 'DH100002',
				quantily: 1,
				price: 15000000,
				sales: 10,
				status: 2,
				ship: 0
			},
			{
				id: 'DH100003',
				quantily: 1,
				price: 150000000000000,
				sales: 10,
				status: 3,
				ship: 30000
			},
			{
				id: 'DH100004',
				quantily: 1,
				price: 15000000,
				sales: 10,
				status: 4,
				ship: 0
			},
		],
		
		
	}
	$scope.arr = []
	$scope.check = 1;
	$scope.selected = function(key) {
		if(key == 1){
			console.log('Đang xử ý')
		}else if(key == 2){
			console.log('Đang giao')
		}else if(key == 3) {
			console.log('Giao hàng thành công')
		}else {
			console.log('Đã hủy')
		}
	}
	$scope.all = function() {
		$scope.arr = $scope.order.myOrder;
	}
	$scope.all();
	
})