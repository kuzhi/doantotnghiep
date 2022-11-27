app.controller("user-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Người dùng';
	$scope.titleBread = 'Khách hàng';
	$scope.showBtn = true;
	$scope.url = "/api/userStore/";
	
	$scope.insert = function() {
		$scope.title = 'Thêm khách hàng mới';
		$scope.showBtn = false;
	}

	// Load list users
	$scope.users = [];
	$scope.deleted=false;
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
			$scope.formUserStore.photo = resp.data.name;
		}).catch(error => {
			alert("Lỗi tải hình ảnh")
			// console.log('error: ', error)
		})
	}

	// Edit user
	$scope.formUserStore = {};
	$scope.edit = function(user) {
		$scope.showBtn = false;
		$scope.reset();
		user.birthday = new Date(user.birthday);
		$scope.formUserStore = angular.copy(user);

	}
	
	
	// Create user
	$scope.create = function() {
		var user = angular.copy($scope.formUserStore);
		
		if ($scope.formUserStore.username != "") {
			$http.get($scope.url + "id/" + $scope.formUserStore.username)
				.then(resp => {
					$scope.users = resp.data;
						if($scope.users.length !=1){
								Swal.fire({
									icon: 'error',
									title: 'Username: ' + $scope.formUserStore.username + ' đã tồn tại!'
						});
						$scope.init();
						$scope.showBtn = false;
					}
					else if ($scope.formUserStore.email != "") {
						console.log("Email: ", $scope.formUserStore.email)
						$http.get($scope.url + "email/" + $scope.formUserStore.email)
							.then(resp => {
								$scope.users = resp.data;
								if($scope.users.length !=1){
									Swal.fire({
										icon: 'error',
										title: 'Email: ' + $scope.formUserStore.email + ' đã tồn tại!'
									});
									$scope.init();
									$scope.showBtn = false;
								}
								else if ($scope.formUserStore.phone != "") {
									console.log("Phone: ", $scope.formUserStore.email)
									$http.get($scope.url + "phone/" + $scope.formUserStore.phone)
										.then(resp => {
											$scope.users = resp.data;
											if($scope.users.length !=1){
												Swal.fire({
													icon: 'error',
													title: 'Số điện thoại: '+ $scope.formUserStore.phone +'đã tồn tại!'
												});
												$scope.init();
												$scope.showBtn = false;
											}else{
												user.create_at = new Date();
										        user.update_at = new Date();
										        
										        user.deleted = false;
										        // console.log('data: ', user);
										        
										        $http.post($scope.url, user).then(resp => {
										            resp.data.create_at = new Date(resp.data.create_at)  
										            resp.data.update_at = new Date(resp.data.update_at)  
										             
										            $scope.users.push(resp.data); 
										        	// console.log('data: ', $scope.products);            
										            $scope.reset(); 
										            $scope.init();
										            Swal.fire({
														icon: 'success',
														title: 'Thêm thành công!'
													});
										        }).catch(error => {
													Swal.fire({
														icon: 'error',
														title: 'Thêm thất bại!'
													});
										            console.log("Error: ", error);
										        });
											}
										}).catch(error => {
											console.log("Error", error);
										});
								}
							}).catch(error => {
								console.log("Error", error);
							});
					}
				}).catch(error => {
					console.log("Error", error);
				});
		}
		
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

				var user = angular.copy($scope.formUserStore);
				
				if ($scope.formUserStore.username != "") {
					$http.get($scope.url + "id/" + $scope.formUserStore.username)
						.then(resp => {
							$scope.users = resp.data;
							if($scope.users.length !=1){
								Swal.fire({
									icon: 'error',
									title: 'Username: ' + $scope.formUserStore.username + ' đã tồn tại!'
								});
								$scope.init();
								$scope.showBtn = false;
							}
							else if ($scope.formUserStore.email != "") {
								console.log("Email: ", $scope.formUserStore.email)
								$http.get($scope.url + "email/" + $scope.formUserStore.email)
									.then(resp => {
										$scope.users = resp.data;
										if($scope.users.length !=1){
											Swal.fire({
												icon: 'error',
												title: 'Email: ' + $scope.formUserStore.email + ' đã tồn tại!'
											});
											$scope.init();
											$scope.showBtn = false;
										}
										else if ($scope.formUserStore.phone != "") {
											console.log("Phone: ", $scope.formUserStore.phone)
											$http.get($scope.url + "phone/" + $scope.formUserStore.phone)
												.then(resp => {
													$scope.users = resp.data;
													if($scope.users.length !=1){
														Swal.fire({
															icon: 'error',
															title: 'Số điện thoại: '+ $scope.formUserStore.phone +'đã tồn tại!'
														});
														$scope.init();
														$scope.showBtn = false;
													}else{
														//====================================== Bắt đầu xử lý
														var user = angular.copy($scope.formUserStore);
														user.update_at = new Date();
										
														//console.log("data: ", user);
										
														$http.put($scope.url + user.id, user).then(resp => {
															var index = $scope.users.findIndex(p => p.id == user.id);
										
															$scope.users[index] = user;
															console.log("Sp: ", $scope.users[index]);
															$scope.reset();
															$scope.init();
										
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
													}
												}).catch(error => {
													console.log("Error", error);
												});
										}
									}).catch(error => {
										console.log("Error", error);
									});
							}
						}).catch(error => {
							console.log("Error", error);
						});
				}
				
				//====================================== Kết thúc xử lý
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
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
	// Find by name userApp
	$scope.nameUser = "";
	$scope.nameUserName = "";
	$scope.findByName = function() {
		if ($scope.nameUser != "") {
			$http.get($scope.url + $scope.nameUser)
				.then(resp => {
					$scope.users = resp.data;
					if($scope.users != ""){
						$scope.users.forEach(user => {
							user.create_at = new Date(user.create_at)
							user.update_at = new Date(user.update_at)
						})
					}
					else{
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
					if($scope.users != ""){
						$scope.users.forEach(user => {
							user.create_at = new Date(user.create_at)
							user.update_at = new Date(user.update_at)
						})
					}
					else{
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
		else if($scope.nameUser != "" && $scope.nameUserName != ""){
			console.log('tìm theo')
			$http.get($scope.url + "id/name/" + $scope.nameUserName + "/" +  $scope.nameUser)
				.then(resp => {
					$scope.users = resp.data;
					if($scope.users != ""){
						$scope.users.forEach(user => {
							user.create_at = new Date(user.create_at)
							user.update_at = new Date(user.update_at)
						})
					}
					else{
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
		else{
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
		if($scope.list == 1) {
			$http.get($scope.url+"sort/a-z")
			.then(resp => { 
	            $scope.users = resp.data;
	            
	            $scope.users.forEach(user => { 
	                user.create_at = new Date(user.create_at)
	                user.update_at = new Date(user.update_at)
	            })
	        });
		} 
		// ======= Z-A
		else if($scope.list == 2) {
			$http.get($scope.url+"sort/z-a")
			.then(resp => { 
	            $scope.users = resp.data;
	            
	            $scope.users.forEach(user => { 
	                user.create_at = new Date(user.create_at)
	                user.update_at = new Date(user.update_at)
	            })
	        });
		} 
		// ======= Hoạt động
		else if($scope.list == 3) {
			$http.get($scope.url+"sort/0-9")
			.then(resp => { 
	            $scope.users = resp.data;
	            
	            $scope.users.forEach(user => { 
	                user.create_at = new Date(user.create_at)
	                user.update_at = new Date(user.update_at)
	            })
	        });
		} 
		// ======= Ngừng hoạt động
		else if($scope.list == 4) {
			$http.get($scope.url+"sort/9-0")
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

	$scope.formUserStore = {};
	$scope.reset = function() {
		$scope.formUserStore = {
			create_at: null,
			update_at: null,
		};
	}
	$scope.reset();
})