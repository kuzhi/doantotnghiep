app = angular.module("cart-detail__app", ["ngRoute"]);
app.controller("cart-detail__app-ctrl", function($scope, $http, $location) {
	$scope.regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
	$scope.shipMoney = 1;

	$scope.editTab1 = function() {
		$scope.shipMoney = 1;
	}

	$scope.editTab2 = function() {
		$scope.shipMoney = 2;
	}

	$scope.orderFinish = function() {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success ms-2',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})
		
		swalWithBootstrapButtons.fire({
			title: 'Đặt hàng',
			text: "Bạn có chắc muốn đặt hàng",
			showCancelButton: true,
			confirmButtonText: 'Đặt luôn',
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
})