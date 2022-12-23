app.controller("sales-channel-ctrl", function($scope, $http, $location, $q) {
	$scope.titleBreadcrumb = "Kênh bán hàng";
	$scope.titleBread = "Kênh quản lý";
	$scope.stores = [];
	$scope.orderpack = [];
	let defer = $q.defer();
	$scope.init = function() {
		$http.get("/api/authorities/"+$scope.userid).then( (resp)=>{

				
			$scope.userRole = resp.data; 
			$scope.userRole.filter((x)=>{
				if(x.permission === "ADMIN"){
					$scope.error = 1;
				}
			})
			if($scope.error == 1){
				defer.resolve(
			
					$http.get("/api/store").then((resp) => {
						$scope.stores = resp.data;
						$scope.stores.filter((store)=>{
							store.enddate = new Date(store.enddate)
						})

					})
				)
			}
			
			else{
				defer.resolve(
				$http.get("/api/support/findByNhanVien/"+$scope.userid).then((resp) => {
					let support  = resp.data;
					support.filter(storeSupport =>{
						$http.get("/api/store/list/" +storeSupport.userStore.id).then((resp) => {
							let listStore = resp.data;
							listStore.filter(store=>{
								store.enddate = new Date(store.enddate)
							
								$scope.stores.push(store);
								
							})
						})
					})

				  })
			)
		
			}
				
		
	});
	}

	// Phân trang và điều hướng
	$scope.pager = {
		page: 0,
		size: 10,
		get stores() {
			var start = this.page * this.size;
			return $scope.stores.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil((1.0 * $scope.stores.length) / this.size);
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
	};
	defer.resolve($scope.init());
	

	// Edit sale
	$scope.formStore = {};
	$scope.edit = function(stores) {
		$scope.formStore = angular.copy(stores);
		$http.get("/api/orderpackstore/" + stores.id).then((resp) => {
			$scope.orderpack = resp.data;
		})
	};

	$scope.update = function () {
		const swalWithBootstrapButtons = Swal.mixin({
		  customClass: {
			confirmButton: "btn btn-danger ms-2",
			cancelButton: "btn btn-success",
		  },
		  buttonsStyling: false,
		});
	
		swalWithBootstrapButtons
		  .fire({
			title: "Thông báo",
			icon: "warning",
			text: "Bạn có chắc muốn thực hiện?",
			showCancelButton: true,
			confirmButtonText: "OK",
			cancelButtonText: "Quay lại",
			reverseButtons: true,
			showClass: {
			  popup: "animate__animated animate__fadeInDownBig",
			},
			hideClass: {
			  popup: "animate__animated animate__fadeOutUpBig",
			},
		  })
		  .then((result) => {
			if (result.isConfirmed) {
			  //====================================== Bắt đầu xử lý
			 
			  var store = angular.copy($scope.formStore);
			  var url = $scope.url;
			  
				$http
				.patch("/api/store/update", store)
				.then((resp) => {
				  $scope.init();
	
				  // Thông báo
				  swalWithBootstrapButtons.fire(
					"Thành công",
					"Cập nhật thành công!",
					"success"
				  );
				  
				
				
			  })
			  //====================================== Kết thúc xử lý
			} else if (
			  /* Read more about handling dismissals below */
			  result.dismiss === Swal.DismissReason.cancel
			) {
			}
		  });
	  };

	  $scope.trial = function(store){
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			  confirmButton: "btn btn-danger ms-2",
			  cancelButton: "btn btn-success",
			},
			buttonsStyling: false,
		  });
	  
		  swalWithBootstrapButtons
			.fire({
			  title: "Thông báo",
			  icon: "warning",
			  text: "Bạn có chắc muốn thực hiện?",
			  showCancelButton: true,
			  confirmButtonText: "OK",
			  cancelButtonText: "Quay lại",
			  reverseButtons: true,
			  showClass: {
				popup: "animate__animated animate__fadeInDownBig",
			  },
			  hideClass: {
				popup: "animate__animated animate__fadeOutUpBig",
			  },
			})
			.then((result) => {
			  if (result.isConfirmed) {
				//====================================== Bắt đầu xử lý
				if(store.enddate<new Date()){

					$http
					.patch("/api/store/trial", store)
					.then((resp) => {
					  $scope.init();
		
					  // Thông báo
					  swalWithBootstrapButtons.fire(
						"Thành công",
						'Tài khoản đã được mở khóa đến cuối ngày!',
						"success"
					  );
					})
				}else{
					Swal.fire({
						icon: 'info',
						title: 'Cửa hàng chưa hết hạn!'
					});
				}
				//====================================== Kết thúc xử lý
			  } else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			  ) {
			  }
			});
		// console.log(store)
		
	  }

	//
	$scope.listFilter = [
		{ id: 1, name: "Fullname giảm dần A-Z" },
		{ id: 2, name: "Fullname tăng dần Z-A" },
	];
	$scope.getUsersbyFilter = function() {
		// ======= A-Z
		if ($scope.list == 1) {
			$http.get("/api/store/" + "sort/a-z").then((resp) => {
				$scope.stores = resp.data;

				$scope.stores.forEach((us) => {
					us.create_at = new Date(us.create_at);
					us.update_at = new Date(us.update_at);
				});
			});
		}
		// ======= Z-A
		else if ($scope.list == 2) {
			$http.get("/api/store/" + "sort/z-a").then((resp) => {
				$scope.stores = resp.data;

				$scope.stores.forEach((us) => {
					us.create_at = new Date(us.create_at);
					us.update_at = new Date(us.update_at);
				});
			});
		}
	};
	// tìm theo id, tên người dùng
	$scope.storeName = "";
	$scope.findByName = function() {
		if ($scope.storeName != "") {
			$http
				.get("/api/store/name/" + $scope.storeName)
				.then((resp) => {
					$scope.stores = resp.data;
					console.log({ resp });
					if ($scope.stores != "") {
						$scope.stores.forEach((u) => {
							u.create_at = new Date(u.create_at);
							u.update_at = new Date(u.update_at);
						});
					} else {
						Swal.fire({
							icon: "error",
							title: "Không có kết quả phù hợp!",
						});
					}
				})
				.catch((error) => {
					console.log("Error", error);
				});
		} else {
			$scope.init();
		}
	};
});
