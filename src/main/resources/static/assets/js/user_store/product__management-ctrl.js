app.controller("product__management-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Thực đơn';
	$scope.titleBread = 'Món ăn';
	
	$scope.insert = function(){
		$scope.titleTable = 'Thêm món mới';
	}
	
	$scope.edit = function(){
		$scope.titleTable = 'Cập nhật món';
	}

	$scope.insertCate = function(){
		$scope.titleTable = 'Thêm loại mới';
		
	}
	
	$scope.editCate = function(){
		$scope.titleTable = 'Cập nhật';
		
	}
	
	$scope.deleteP = function() {
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
			){}
		})
	}

	$scope.deleteC = function() {
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
			){}
		})
	}
	
	$scope.list = {
		product: [
			{
				id: '1',
				name: 'Khoai chiên',
				img: 'sp1.jpg',
				price: 15000
			},
			{
				id: '2',
				name: 'Hamberger',
				img: 'sp3.jpeg',
				price: 15000
			},
			{
				id: '3',
				name: 'Nước ngọt',
				img: 'sp4.jpeg',
				price: 15000
			},
		],
		cate: [
			{
				id: 1,
				name: 'KFC'
			},
			{
				id: 2,
				name: 'Bánh mì'
			},
			{
				id: 3,
				name: 'Nước ngọt'
			},
		]
	}
	
})