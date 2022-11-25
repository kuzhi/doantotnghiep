app.controller("myprofile-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Cá nhân';
	$scope.titleBread = 'Thông tin';
	$scope.url = "/api/user/";
	
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
			){}
		})
	}
	
	//Cập nhật người dùng
	$scope.users = [];
	$scope.update = function() {
		var user = angular.copy($scope.formUserStore); //copy thông tin người dùng vào user
		$http.put($scope.url + user.id , user).then(resp => {
			var index = $scope.users.findIndex(sp => sp.id == user.id);
			$scope.users[index] = user;
			// Thông báo
			Swal.fire({
				icon: 'success',
				title: 'Cập nhật thành công!'
			});
		}).catch(error => {
			// Thông báo
			Swal.fire({
				icon: 'error',
				title: 'Cập nhật thất bại!'
			});
			console.log("Error", error);
		});
	}
})