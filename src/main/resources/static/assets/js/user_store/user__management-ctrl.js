app.controller("user__management-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Nhân viên';
	$scope.titleBread = 'Tất cả';

	$scope.insert = function () {
		$scope.title = 'Thêm nhân viên';
		$scope.statusInput = true;
	}
	
	$scope.edit = function () {
		$scope.title = 'Cập nhật nhân viên';
		$scope.statusInput = false;
	}
	
	$scope.delete = function() {
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
		user: [
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
			{
				username: 'annv',
				fullname: 'Nguyễn Văn An',
				email: 'annv@gmail.com',
				gender: true,
				img: 'user.jpg'
			},
		]
	}
})