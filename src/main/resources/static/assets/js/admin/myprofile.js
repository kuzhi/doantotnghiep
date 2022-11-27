app.controller("myprofile-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Cá nhân';
	$scope.titleBread = 'Thông tin';
	$scope.url = "/api/user/";
	
	$scope.loadUserStore = function(){
		// Lấy userid
        //$http.get("/api/get")
	    //.then(resp => {
	        //$scope.userid = resp.data;
        	
        	$scope.userid = 2;
			$http.get("/api/userApp/get-user-app/"+$scope.userid).then(resp=>{
				$scope.userApp = resp.data;
				$scope.userApp.birthday = new Date($scope.userApp.birthday)
				console.log($scope.userApp)
			})
	    //})
		
	};
	$scope.loadUserStore();
	
	
	// Update user
	$scope.userStore={};
	$scope.update = function() {
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
			text: "Bạn có chắc muốn thực hiện?",
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

				//====================================== Bắt đầu xử lý
				var user = angular.copy($scope.userStore);
				user.update_at = new Date();

				//console.log("data: ", user);

				$http.put("/api/user/" + user.id, user).then(resp => {

					$scope.userStore = user;
					console.log("Sp: ", $scope.userStore);

					// Thông báo
					swalWithBootstrapButtons.fire(
						'Thành công',
						'Cập nhật thành công!',
						'success'
					)

				}).catch(error => {
					// Thông báo
					Swal.fire({
						icon: 'error',
						title: 'Cập nhật thất bại!'
					});
					console.log("Error", error);
				});
				//====================================== Kết thúc xử lý
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}
})