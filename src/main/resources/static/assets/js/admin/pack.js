app.controller("pack-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Gói dịch vụ';
	$scope.titleBread = 'Duyệt gói dịch vụ trong hệ thống';
	$scope.url = "/api/pack/";
	$scope.status = 1;
	$scope.showBtn = true;
	
	$scope.insert = function() {
		$scope.showBtn = true;
	}
	
	$scope.listFilter = [
		{ id: 1, name: "Sắp xếp theo tên A-Z" },
		{ id: 2, name: "Sắp xếp theo tên Z-A" },
		{ id: 3, name: "Sắp xếp theo giá 0-9" },
		{ id: 4, name: "Sắp xếp theo giá 9-0" },
	]
	
	$scope.packs=[];
	$scope.loadPack = function() {
		$http.get($scope.url)
		.then(resp => {
			$scope.packs = resp.data;
		})
	}; $scope.loadPack();
	
	// Phân trang và điều hướng
    $scope.pager = {
        page: 0,
        size: 10,
        get packs(){
            var start = this.page * this.size;
            return $scope.packs.slice(start, start + this.size);
        },
        get count(){
            return Math.ceil(1.0 * $scope.packs.length / this.size);
        },
        first(){
            this.page = 0;
        },
        prev(){
            this.page--;
            if(this.page < 0){
                this.last();
            }
        },
        next(){
            this.page++;
            if(this.page >= this.count){
                this.first();
            }
        },
        last(){
            this.page = this.count - 1;
        },
    }
    
    // Edit pack
	$scope.formPack = {};
	$scope.edit = function(pack){
		$scope.showBtn = false;
		
        $scope.formPack = angular.copy(pack);
        // console.log('data: ', $scope.formProduct)
    }
    
    // Reset form pack
    $scope.reset = function(){
        $scope.formPack = {
            create_at: null,
            update_at: null,
            image: 'default__image.png',
        };
    }
    $scope.reset();
    
    //Change image
    $scope.ImageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/api/upload/Pack', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			// console.log('data: ', resp.data)
			$scope.formPack.image = resp.data.name;
		}).catch(error => {
			alert("Lỗi tải hình ảnh")
			// console.log('error: ', error)
		})
	}
    
    // Create pack
    $scope.create = function(){
        var pack = angular.copy($scope.formPack);
        
        pack.create_at = new Date();
        pack.update_at = new Date();
        
        // console.log('data: ', product);
        
        $http.post($scope.url, pack).then(resp => {
            resp.data.create_at = new Date(resp.data.create_at)  
            resp.data.update_at = new Date(resp.data.update_at)  
             
            $scope.packs.push(resp.data); 
            $scope.reset(); 
            $scope.loadPack();
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
    
    // Update pack
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
				var pack = angular.copy($scope.formPack);
        		pack.update_at = new Date();
        		
				// console.log("data: ", product);
		
				$http.put($scope.url + pack.id, pack).then(resp => {
		            var index = $scope.packs.findIndex(p => p.id == pack.id);
		            
		            $scope.packs[index] = pack;
		            // console.log("Sp: ", $scope.products[index]);
		            $scope.reset(); 
            		$scope.loadPack();
		            
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
			){}
		})
	}
    
    // Delete pack
	$scope.delete = function(pack) {
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
				$http.delete(`/api/pack/${pack.id}`)
				.then(resp => {
					var index = $scope.packs.findIndex(p => p.id == pack.id);
		            $scope.packs.splice(index, 1);
		            
		            $scope.reset();
		            $scope.loadPack();
		            // Thông báo
					swalWithBootstrapButtons.fire(
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
			){}
		})
	}
    
    // Find by name pack
  	$scope.namePack = "";
  	$scope.findByName = function() {
		$http.get($scope.url + $scope.namePack)
		.then(resp => {
			$scope.packs = resp.data;
            
            $scope.packs.forEach(pack => { 
                pack.create_at = new Date(pack.create_at)
                pack.update_at = new Date(pack.update_at)
            })
			
        }).catch(error => {
            console.log("Error", error);
        });	
	}  
    
    $scope.getProductsbyFilter = function() {
		// ======= A-Z
		if($scope.list == 1) {
			$http.get($scope.url+"sort/a-z")
			.then(resp => { 
	            $scope.packs = resp.data;
	            $scope.packs.forEach(pack => { 
	                pack.create_at = new Date(pack.create_at)
	                pack.update_at = new Date(pack.update_at)
	            })
	        });
		} 
		// ======= Z-A
		else if($scope.list == 2) {
			$http.get($scope.url+"sort/z-a")
			.then(resp => { 
	            $scope.packs = resp.data;
	            
	            $scope.packs.forEach(pack => { 
	                pack.create_at = new Date(pack.create_at)
	                pack.update_at = new Date(pack.update_at)
	            })
	        });
		} 
		// ======= 0-9
		else if($scope.list == 3) {
			$http.get($scope.url+"sort/0-9")
			.then(resp => { 
	            $scope.packs = resp.data;
	            
	            $scope.packs.forEach(pack => { 
	                pack.create_at = new Date(pack.create_at)
	                pack.update_at = new Date(pack.update_at)
	            })
	        });
		} 
		// ======= 9-0
		else if($scope.list == 4) {
			$http.get($scope.url+"sort/9-0")
			.then(resp => { 
	            $scope.packs = resp.data;
	            
	            $scope.packs.forEach(pack => { 
	                pack.create_at = new Date(pack.create_at)
	                pack.update_at = new Date(pack.update_at)
	            })
	        });	
		}
	}
    
})