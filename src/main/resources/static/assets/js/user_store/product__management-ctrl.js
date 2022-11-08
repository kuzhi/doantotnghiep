app.controller("product__management-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Thực đơn';
	$scope.titleBread = 'Món ăn';
	$scope.showBtn = true;
	$scope.url = "/api/product/";
	
	$scope.insert = function(){
		$scope.showBtn = true;
		$scope.titleTable = 'Thêm món mới';
	}

	// Load list products
	$scope.products = [];
	$scope.categorys = [];
	$scope.init = function() {
		$http.get($scope.url).then(resp => { 
            $scope.products = resp.data;
            
            $scope.products.forEach(product => { 
                product.create_at = new Date(product.create_at)
                product.update_at = new Date(product.update_at)
            })
        });
        
        $http.get("/api/category/view").then(resp => { 
            $scope.categorys = resp.data;
        });
	}
	
	// Phân trang và điều hướng
    $scope.pager = {
        page: 0,
        size: 10,
        get products(){
            var start = this.page * this.size;
            return $scope.products.slice(start, start + this.size);
        },
        get count(){
            return Math.ceil(1.0 * $scope.products.length / this.size);
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
	
	$scope.init();
	
	// Edit product
	$scope.formProduct = {};
	$scope.edit = function(product){
		$scope.titleTable = 'Cập nhật món';
		$scope.showBtn = false;
		
        $scope.formProduct = angular.copy(product);
        // console.log('data: ', $scope.formProduct)
    }
    
    // Reset form product
    $scope.reset = function(){
        $scope.formProduct = {
            create_at: null,
            update_at: null,
            image: 'icon_food.png',
            category: {
	            id: 1
	        },
        };
    }
    $scope.reset();
    
    //Change image
    $scope.ImageChanged = function(files){
        var data = new FormData();
        data.append('file', files[0]); 
        $http.post('/api/upload/Products', data, { 
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(resp => {
			// console.log('data: ', resp.data)
            $scope.formProduct.image = resp.data.name; 
        }).catch(error => {
            alert("Lỗi tải hình ảnh")
            // console.log('error: ', error)
        })
    }
    
    // Create product
    $scope.create = function(){
        var category = document.querySelector("#selectCbbL").value;
        $scope.formProduct.category.id = JSON.parse(category);
        var product = angular.copy($scope.formProduct);
        
        product.create_at = new Date();
        product.update_at = new Date();
        
        // console.log('data: ', product);
        
        $http.post($scope.url, product).then(resp => {
            resp.data.create_at = new Date(resp.data.create_at)  
            resp.data.update_at = new Date(resp.data.update_at)  
             
            $scope.products.push(resp.data); 
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
    
    // Update product
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
				var category = document.querySelector("#selectCbbL").value;
        		$scope.formProduct.category.id = JSON.parse(category);
        		
				var product = angular.copy($scope.formProduct);
        		product.update_at = new Date();
        		
				// console.log("data: ", product);
		
				$http.put($scope.url + product.id, product).then(resp => {
		            var index = $scope.products.findIndex(p => p.id == product.id);
		            
		            $scope.products[index] = product;
		            // console.log("Sp: ", $scope.products[index]);
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
				//====================================== Kết thúc xử lý
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			){}
		})
	}
	
	// Delete product
	$scope.delete = function(product) {
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
				$http.delete(`/api/product/${product.id}`)
				.then(resp => {
					var index = $scope.products.findIndex(p => p.id == product.id);
		            $scope.products.splice(index, 1);
		            
		            $scope.reset();
		            $scope.init();
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
  
  	// Find by name product
  	$scope.nameProduct = "";
  	$scope.findByName = function() {
		$http.get($scope.url + $scope.nameProduct)
		.then(resp => {
			$scope.products = resp.data;
            
            $scope.products.forEach(product => { 
                product.create_at = new Date(product.create_at)
                product.update_at = new Date(product.update_at)
            })
			
            // console.log("Sp: ", resp.data);
        }).catch(error => {
            console.log("Error", error);
        });	
	}  
	
	// Load list product by filter
	$scope.listFilter = [
		{
			id: 1,
			name: "A-Z"
		},
		{
			id: 2,
			name: "Z-A"
		},
		{
			id: 3,
			name: "0-9"
		},
		{
			id: 4,
			name: "9-0"
		},
	]
	$scope.getProductsbyFilter = function() {
		// ======= A-Z
		if($scope.list == 1) {
			$http.get($scope.url+"sort/a-z")
			.then(resp => { 
	            $scope.products = resp.data;
	            
	            $scope.products.forEach(product => { 
	                product.create_at = new Date(product.create_at)
	                product.update_at = new Date(product.update_at)
	            })
	        });
		} 
		// ======= Z-A
		else if($scope.list == 2) {
			$http.get($scope.url+"sort/z-a")
			.then(resp => { 
	            $scope.products = resp.data;
	            
	            $scope.products.forEach(product => { 
	                product.create_at = new Date(product.create_at)
	                product.update_at = new Date(product.update_at)
	            })
	        });
		} 
		// ======= 0-9
		else if($scope.list == 3) {
			$http.get($scope.url+"sort/0-9")
			.then(resp => { 
	            $scope.products = resp.data;
	            
	            $scope.products.forEach(product => { 
	                product.create_at = new Date(product.create_at)
	                product.update_at = new Date(product.update_at)
	            })
	        });
		} 
		// ======= 9-0
		else if($scope.list == 4) {
			$http.get($scope.url+"sort/9-0")
			.then(resp => { 
	            $scope.products = resp.data;
	            
	            $scope.products.forEach(product => { 
	                product.create_at = new Date(product.create_at)
	                product.update_at = new Date(product.update_at)
	            })
	        });	
		}
	}
})