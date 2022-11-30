app.controller("supporter-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Hỗ trợ';
	$scope.titleBread = 'Phân công hỗ trợ';
	$scope.supports= [];
	$scope.users= [];
	// $scope.edit = function(){
	// 	$scope.titleTable = 'Cấp quyền hỗ trợ cho kênh';
		
	// }
	

	$scope.init =  function(){
		$http.get("/api/support").then(resp =>
			{
				$scope.supports = resp.data;
			})

	}
	
	$scope.initUsers =  function(){
		$http.get("/api/userApp").then(resp =>
			{
				$scope.users = resp.data;
			})
			$http.get("/api/userApp/getamin").then(resp =>
				{
					let a = resp.data;
					console.log({a});
				})

	}

	// Phân trang và điều hướng
	$scope.pager = {
		page: 0,
		size: 10,
		get stores() {
			var start = this.page * this.size;
			return $scope.supports.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.supports.length / this.size);
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
	$scope.init();
	$scope.initUsers();
// Edit 
		$scope.formSupport = {};
		$scope.edit = function(support) {
			$scope.titleTable = 'Cập nhật';
			$scope.formSupport = angular.copy(support);
			console.log({support})
		}
	
	// Update 
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
				var user = document.querySelector("#selectUser").value;
				$scope.formSupport.userApp.id = JSON.parse(user);

				var support = angular.copy($scope.formSupport);
				var url = $scope.url
				 console.log( {support});

				$http.patch("/api/support/update", support).then(resp => {
					
					
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
				//====================================== Kết thúc xử lý
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) { }
		})
	}

	$scope.delete = function(support) {
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
				//====================================== Bắt đầu xử lý
				
				let formSupport =  support;
				
				

				$http.delete("/api/support/delete/"+ formSupport.id, support).then(resp => {
				

				swalWithBootstrapButtons.fire(
					'Đã xóa',
					'Đã xóa thành công!',
					'success'
				)
				$scope.init();
			})
			.catch(error => {
				// Thông báo
				Swal.fire({
					icon: 'error',
					title: 'Xóa thất bại!'
				});
				console.log("Error", error);
			});
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			){}
		})
	}
	
	$scope.listFilter = [
		{ id: 1, name: "Fullname giảm dần A-Z" },
		{ id: 2, name: "Fullname tăng dần Z-A" },
		{ id: 3, name: "Giới tính nam" },
		{ id: 4, name: "Giới tính nữ" },
	]
	
})