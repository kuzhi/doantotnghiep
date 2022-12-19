
app.controller("myprofile-ctrl", function ($scope, $http, $location) {


	$scope.titleBreadcrumb = 'Cá nhân';
	$scope.titleBread = 'Thông tin';
	$scope.url = "/api/userStore/";
	$scope.changePassword = [];
	$scope.regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

	$scope.loadUserStore = function () {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;

				$http.get("/api/user/get-user-store/" + $scope.userid).then(resp => {
					$scope.userStore = resp.data;
					//console.log($scope.userStore)
					$scope.userStore.birthday = new Date($scope.userStore.birthday)
				})
			})

		// Set độ tuổi
		const now = new Date();
		$scope.valueAge = new Date();
		$scope.valueAge.setMonth(0);
		$scope.valueAge.setFullYear(now.getFullYear() - 17);
		$scope.maxAge = new Date();
		$scope.maxAge.setFullYear(now.getFullYear() - 17);
		$scope.formatDate = function (date) {
			var d = new Date(date),
				month = "" + (d.getMonth() + 1),
				day = "" + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) month = "0" + month;
			if (day.length < 2) day = "0" + day;

			return [year, month, day].join("-");
		};
		$scope.formatDate($scope.maxAge);

	};
	$scope.loadUserStore();

	//Change image
	$scope.ImageChanged = function (files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/api/upload/User', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			// console.log('data: ', resp.data)
			$scope.userStore.photo = resp.data.name;
		}).catch(error => {
			alert("Lỗi tải hình ảnh")
			console.log('error: ', error)
		})
	}

	// Update user
	$scope.userStore = {};
	$scope.update = function () {
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
				//console.log(user)

				// Nếu email và sdt thuộc user thì update
				$http.get($scope.url + "email/" + user.email + "/" + user.id).then(resp => {
					const myEmail = resp.data;
					//console.log("email: ", myEmail)
					// tìm ra thì tìm sdt
					if (myEmail.length != 0) {
						//console.log("check sdt")
						$http.get($scope.url + "phone/" + user.phone + "/" + user.id).then(resp => {
							const myPhone = resp.data;
							//sconsole.log("phone v2: ", myPhone)
							// tìm ra thì cập nhật
							if (myPhone.length != 0) {
								//console.log("cap nhat v2")
								$scope.updateReal(user);
							} else { // tìm k ra thì check trùng
								// Check phone
								$http.get($scope.url + "phone/" + user.phone).then(resp => {
									const checkPhone = resp.data;
									if (checkPhone.length != 0) {
										Swal.fire({ icon: 'warning', title: 'Số điện thoại "' + user.phone + '" đã tồn tại!' });
									} else { // neu phone moi k trung thi update
										//console.log("check phone -> k trung")
										$scope.updateReal(user);
									}
								}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }); console.log(error); });
							}
						}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }); console.log(error); });
					} else { // tìm k ra thì check trùng
						console.log("check email trung")
						// Check email
						$http.get($scope.url + "email/" + user.email).then(resp => {
							const checkEmail = resp.data;
							if (checkEmail.length != 0) {
								Swal.fire({ icon: 'warning', title: 'Email "' + user.email + '" đã tồn tại!' });
							} else {
								//console.log("check email -> k trung")
								//console.log("check sdt")
								$http.get($scope.url + "phone/" + user.phone + "/" + user.id).then(resp => {
									const myPhone = resp.data;
									//console.log("phone v1: ", myPhone)
									// tìm ra thì cập nhật
									if (myPhone.length != 0) {
										//console.log("cap nhat v1")
										$scope.updateReal(user);
									} else { // tìm k ra thì check trùng
										// Check phone
										$http.get($scope.url + "phone/" + user.phone).then(resp => {
											const checkPhone = resp.data;
											if (checkPhone.length != 0) {
												Swal.fire({ icon: 'warning', title: 'Số điện thoại "' + user.phone + '" đã tồn tại!' });
											} else { // neu phone moi k trung thi update
												//console.log("check phone -> k trung")
												$scope.updateReal(user);
											}
										}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }); console.log(error); });
									}
								}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }); console.log(error); });
							}
						}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }); console.log(error); });
					}
					$http.get($scope.url + "phone/" + user.phone + "/" + user.id).then(resp => {



					}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
					// Ngược lại email và sdt không thuộc user thì báo lỗi
				}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
				//====================================== Kết thúc xử lý
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}
	$scope.updateReal = function (user) {
		$http.put("/api/userStore/" + "updateProfile/" + user.id, user).then(resp => {

			$scope.userStore = user;
			//console.log("Sp: ", $scope.userStore);

			// Thông báo
			Swal.fire({
				icon: 'success',
				title: 'Cập nhật thành công!'
			})

		}).catch(error => {
			// Thông báo
			Swal.fire({
				icon: 'error',
				title: 'Cập nhật thất bại!'
			});
			console.log("Error", error);
		});
	}

	$scope.updatePassword = function (changePassword) {
		$scope.changePassword = changePassword;

		let newPassword = $scope.changePassword.newPassword;
		let checkPassword = $scope.changePassword.confirmNewPassword;


		var data = $scope.userStore;
		$http.post($scope.url + "checkPassworrd/" + changePassword.oldPassword, data).then(resp => {
			const check = resp.data;

			if (check === true) {
				if (newPassword === checkPassword) {
					data.password = newPassword;
					$http.put($scope.url + data.id, data).then(resp => {
						Swal.fire({
							icon: 'success',
							title: 'Đổi mật khẩu thành công!'
						})
						location.reload();
					}).catch(error => {
						// Thông báo
						Swal.fire({
							icon: 'error',
							title: 'Đổi mật khẩu hk thành công!'
						});

					});
				} else {
					// Thông báo
					Swal.fire({
						icon: 'error',
						title: 'Xác nhận mật khẩu không đúng!'
					})
				}
			}
			else {
				// Thông báo
				Swal.fire({
					icon: 'error',
					title: 'Mật khẩu hiện tại không đúng!'
				})
			}

		}).catch(error => {
			// Thông báo
			Swal.fire({
				icon: 'error',
				title: 'Lỗi!'
			});
			console.log("Error", error);
		});
		//checkPassworrd/{password}
	}
})
