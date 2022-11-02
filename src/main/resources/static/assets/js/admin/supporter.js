app.controller("supporter-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Cấp quyền';
	$scope.titleBread = 'Phân công quản trị';
	
	
	$scope.edit = function(){
		$scope.titleTable = 'Cấp quyền quản trị cho kênh';
		
	}
	
	$scope.list = {
		suporter: [
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				staff: 'user-1',
				status: 1,
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				staff: 'user-1',
				status: 0,
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				staff: 'user-1',
				status: 1,
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				staff: 'user-1',
				status: 0,
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				staff: 'user-1',
				status: 1,
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				staff: 'user-1',
				status: 1,
				img: 'icon_food.png'
			},
		],
		
		user: [
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 2,
				name: 'Trần Thị Bình'
			},
			{
				id: 3,
				name: 'Nguyễn Văn Chánh'
			},
		]
	}
	
	$scope.edit = function(){
		$scope.titleTable = 'Cập nhật';
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
	
})