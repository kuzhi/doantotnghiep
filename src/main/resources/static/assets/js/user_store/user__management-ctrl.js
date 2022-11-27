app.controller("user__management-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Người dùng';
	$scope.titleBread = 'Người mua hàng';
	$scope.showBtn = true;
	$scope.url = "/api/user/";
	$scope.regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

	$scope.insert = function() {
		$scope.showBtn = true;
		$scope.statusInput = true;
	}


	// Load list users
	$scope.users = [];
	$scope.deleted = false;
	$scope.init = function() {
		$http.get($scope.url + "deleted/" + $scope.deleted).then(resp => {
			$scope.users = resp.data;

			$scope.users.forEach(user => {
				user.create_at = new Date(user.create_at)
				user.update_at = new Date(user.update_at)
			})
		});
	}
	$scope.init();

	// Phân trang và điều hướng
	$scope.pager = {
		page: 0,
		size: 10,
		get users() {
			var start = this.page * this.size;
			return $scope.users.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.users.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		},
	}

	//Change image
	$scope.ImageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/api/upload/User', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			// console.log('data: ', resp.data)
			$scope.formUser.photo = resp.data.name;
		}).catch(error => {
			alert("Lỗi tải hình ảnh")
			// console.log('error: ', error)
		})
	}

	// Edit user
	$scope.formUser = {};
	$scope.edit = function(user) {
		$scope.showBtn = false;

		user.birthday = new Date(user.birthday);
		$scope.formUser = angular.copy(user);

	}

	// Create user
	$scope.create = function() {
		var user = angular.copy($scope.formUser);

		// Check Username
		$http.get($scope.url + "id/" + user.username).then(resp => {
			const username = resp.data;
			if (username.length != 0) {
				Swal.fire({ icon: 'warning', title: 'Mã đăng nhập "' + user.username + '" đã tồn tại!' });
				$scope.init();
			} else {
				// Check email
				$http.get($scope.url + "email/" + user.email).then(resp => {
					const email = resp.data;
					if (email.length != 0) {
						Swal.fire({ icon: 'warning', title: 'Email "' + user.email + '" đã tồn tại!' });
						$scope.init();
					} else {
						// Check phone
						$http.get($scope.url + "phone/" + user.phone).then(resp => {
							const phone = resp.data;
							if (phone.length != 0) {
								Swal.fire({ icon: 'warning', title: 'Số điện thoại "' + user.phone + '" đã tồn tại!' });
								$scope.init();
							} else {
								user.create_at = new Date();
								user.update_at = new Date();
								user.deleted = false;

								$http.post($scope.url, user).then(resp => {
									resp.data.create_at = new Date(resp.data.create_at)
									resp.data.update_at = new Date(resp.data.update_at)

									$scope.users.push(resp.data);

									$scope.reset();
									$scope.init();
									Swal.fire({ icon: 'success', title: 'Thêm thành công!' });

								}).catch(error => {
									Swal.fire({ icon: 'error', title: 'Thêm thất bại!' });
								});
							}
						}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }); });
					}
				}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }); });
			}
		}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }); });
	}


	// Update user
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

				var user = angular.copy($scope.formUser);
				// Nếu email và sdt thuộc user thì update
				$http.get($scope.url + "email/" + user.email + "/" + user.id).then(resp => {
					const myEmail = resp.data;
					console.log("email: ", myEmail)
					// tìm ra thì tìm sdt
					if (myEmail.length != 0) {
						console.log("check sdt")
						$http.get($scope.url + "phone/" + user.phone + "/" + user.id).then(resp => {
							const myPhone = resp.data;
							console.log("phone v2: ", myPhone)
							// tìm ra thì cập nhật
							if (myPhone.length != 0) {
								console.log("cap nhat v2")
								$scope.updateReal(user);
							} else { // tìm k ra thì check trùng
								// Check phone
								$http.get($scope.url + "phone/" + user.phone).then(resp => {
									const checkPhone = resp.data;
									if (checkPhone.length != 0) {
										Swal.fire({ icon: 'warning', title: 'Số điện thoại "' + user.phone + '" đã tồn tại!' });
									} else { // neu phone moi k trung thi update
										console.log("check phone -> k trung")
										$scope.updateReal(user);
									}
								}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
							}
						}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
					} else { // tìm k ra thì check trùng
						console.log("check email trung")
						// Check email
						$http.get($scope.url + "email/" + user.email).then(resp => {
							const checkEmail = resp.data;
							if (checkEmail.length != 0) {
								Swal.fire({ icon: 'warning', title: 'Email "' + user.email + '" đã tồn tại!' });
							} else {
								console.log("check email -> k trung")
								console.log("check sdt")
								$http.get($scope.url + "phone/" + user.phone + "/" + user.id).then(resp => {
									const myPhone = resp.data;
									console.log("phone v1: ", myPhone)
									// tìm ra thì cập nhật
									if (myPhone.length != 0) {
										console.log("cap nhat v1")
										$scope.updateReal(user);
									} else { // tìm k ra thì check trùng
										// Check phone
										$http.get($scope.url + "phone/" + user.phone).then(resp => {
											const checkPhone = resp.data;
											if (checkPhone.length != 0) {
												Swal.fire({ icon: 'warning', title: 'Số điện thoại "' + user.phone + '" đã tồn tại!' });
											} else { // neu phone moi k trung thi update
												console.log("check phone -> k trung")
												$scope.updateReal(user);
											}
										}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
									}
								}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
							}
						}).catch(error => { Swal.fire({ icon: 'error', title: 'Lỗi!' + error }) });
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
	};

	$scope.updateReal = function(user) {
		//====================================== Bắt đầu xử lý
		user.update_at = new Date();

		//console.log("data: ", user);

		$http.put($scope.url + user.id, user).then(resp => {
			var index = $scope.users.findIndex(p => p.id == user.id);

			$scope.users[index] = user;

			$scope.reset();
			$scope.init();

			// Thông báo
			Swal.fire({ icon: 'success', title: 'Cập nhật thành công!' });

		}).catch(error => {
			// Thông báo
			Swal.fire({ icon: 'error', title: 'Cập nhật thất bại!' });
		});
	}
	// Delete user
	$scope.delete = function(user) {

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
				user.update_at = new Date();
				user.deleted = true;
				$http.put($scope.url + user.id, user).then(resp => {
					var index = $scope.users.findIndex(p => p.id == user.id);
					$scope.users.splice(index, 1);

					$scope.reset();
					$scope.init();
					// Thông báo
					Swal.fire(
						'Đã xóa',
						'Đã xóa thành công!',
						'success'
					)
				})
					.catch(error => {
						// Thông báo
						Swal.fire({
							icon: 'error',
							title: 'Xóa thất bại!'
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

	// Find by name product
	$scope.nameUser = "";
	$scope.nameUserName = "";
	$scope.findByName = function() {
		if ($scope.nameUser != "") {
			$http.get($scope.url + $scope.nameUser)
				.then(resp => {
					$scope.users = resp.data;
					if ($scope.users != "") {
						$scope.users.forEach(user => {
							user.create_at = new Date(user.create_at)
							user.update_at = new Date(user.update_at)
						})
					}
					else {
						Swal.fire({
							icon: 'error',
							title: 'Không có kết quả phù hợp!'
						});
						$scope.init();
					}
				}).catch(error => {
					console.log("Error", error);
				});
		}
		else if ($scope.nameUserName != "") {
			console.log('tìm theo mã', $scope.nameUserName)
			$http.get($scope.url + "id/" + $scope.nameUserName)
				.then(resp => {
					$scope.users = resp.data;
					if ($scope.users != "") {
						$scope.users.forEach(user => {
							user.create_at = new Date(user.create_at)
							user.update_at = new Date(user.update_at)
						})
					}
					else {
						Swal.fire({
							icon: 'error',
							title: 'Không có kết quả phù hợp!'
						});
						$scope.init();
					}

				}).catch(error => {
					console.log("Error", error);
				});
		}
		else if ($scope.nameUser != "" && $scope.nameUserName != "") {
			console.log('tìm theo')
			$http.get($scope.url + "id/name/" + $scope.nameUserName + "/" + $scope.nameUser)
				.then(resp => {
					$scope.users = resp.data;
					if ($scope.users != "") {
						$scope.users.forEach(user => {
							user.create_at = new Date(user.create_at)
							user.update_at = new Date(user.update_at)
						})
					}
					else {
						Swal.fire({
							icon: 'error',
							title: 'Không có kết quả phù hợp!'
						});
						$scope.init();
					}
				}).catch(error => {
					console.log("Error", error);
				});
		}
		else {
			$scope.init();
		}
	}

	// Load list user by filter
	$scope.listFilter = [
		{
			id: 1,
			name: "Fullname giảm dần A-Z"
		},
		{
			id: 2,
			name: "Fullname tăng dần Z-A"
		},
		{
			id: 3,
			name: "Hoạt động"
		},
		{
			id: 4,
			name: "Ngừng hoạt động"
		},
	]
	$scope.getUsersbyFilter = function() {
		// ======= A-Z
		if ($scope.list == 1) {
			$http.get($scope.url + "sort/a-z")
				.then(resp => {
					$scope.users = resp.data;

					$scope.users.forEach(user => {
						user.create_at = new Date(user.create_at)
						user.update_at = new Date(user.update_at)
					})
				});
		}
		// ======= Z-A
		else if ($scope.list == 2) {
			$http.get($scope.url + "sort/z-a")
				.then(resp => {
					$scope.users = resp.data;

					$scope.users.forEach(user => {
						user.create_at = new Date(user.create_at)
						user.update_at = new Date(user.update_at)
					})
				});
		}
		// ======= Hoạt động
		else if ($scope.list == 3) {
			$http.get($scope.url + "sort/0-9")
				.then(resp => {
					$scope.users = resp.data;

					$scope.users.forEach(user => {
						user.create_at = new Date(user.create_at)
						user.update_at = new Date(user.update_at)
					})
				});
		}
		// ======= Ngừng hoạt động
		else if ($scope.list == 4) {
			$http.get($scope.url + "sort/9-0")
				.then(resp => {
					$scope.users = resp.data;

					$scope.users.forEach(user => {
						user.create_at = new Date(user.create_at)
						user.update_at = new Date(user.update_at)
					})
				});
		}
	}
	// Reset form user

	$scope.formUser = {};
	$scope.reset = function() {
		$scope.formUser = {
			create_at: null,
			update_at: null,
			photo: "",
		};
		// Set độ tuổi
		const now = new Date();
		$scope.valueAge = new Date(); $scope.valueAge.setMonth(0); $scope.valueAge.setFullYear(now.getFullYear() - 17);
		$scope.maxAge = new Date(); $scope.maxAge.setFullYear(now.getFullYear() - 17);
		$scope.formatDate = function(date) {
			var d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2)
				month = '0' + month;
			if (day.length < 2)
				day = '0' + day;

			return [year, month, day].join('-');
		}; $scope.formatDate($scope.maxAge);
	}
	$scope.reset();
})