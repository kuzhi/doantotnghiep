app.controller("order__management-all-ctrl", function($scope, $http, $location) {
	$scope.statusShowAction = true;
	$scope.titleTable = 'Tất cả hóa đơn';
	$scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Tất cả';
	
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
		order: [
			{
				id: 'HD100001',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 1
			},
			{
				id: 'HD100002',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 2
			},
			{
				id: 'HD100003',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 3
			},
			{
				id: 'HD100004',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 4
			},
			{
				id: 'HD100005',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 1
			},
			{
				id: 'HD100006',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 1
			},
		],
		detailOrder: [
			{
				id: 'sp1',
				name: 'Khoai tây chiên',
				unit: 'Phần',
				price: 15000,
				quantily: 1,
				discount: 0,
				amount: 15000,
			},
			{
				id: 'sp2',
				name: 'Khoai tây chiên',
				unit: 'Phần',
				price: 15000,
				quantily: 1,
				discount: 0,
				amount: 15000,
			},
			{
				id: 'sp3',
				name: 'Khoai tây chiên',
				unit: 'Phần',
				price: 15000,
				quantily: 1,
				discount: 0,
				amount: 15000,
			},
		]
	}
	
})

app.controller("order__management-loading-ctrl", function($scope, $http, $location) {
    $scope.statusShowAction = true;
    $scope.titleTable = 'Hóa đơn đang chờ duyệt';
    $scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Chờ duyệt';
	
	$scope.list = {
		order: [
			{
				id: 'HD100001',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 1
			},
			{
				id: 'HD100005',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 1
			},
			{
				id: 'HD100006',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 1
			},
		]
	}
})

app.controller("order__management-success-ctrl", function($scope, $http, $location) {
    $scope.statusShowAction = false;
    $scope.titleTable = 'Hóa đơn đã giao';
    $scope.titleBreadcrumb = 'Hóa đơn';
	$scope.titleBread = 'Đã giao';
	
	$scope.list = {
		order: [
			{
				id: 'HD100002',
				createDate: '11-10-2022',
				staff: 'Nguyễn Văn A',
				status: 2
			},
		]
	}
})