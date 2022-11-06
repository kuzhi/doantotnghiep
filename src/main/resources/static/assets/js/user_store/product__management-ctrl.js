app.controller("product__management-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Thực đơn';
	$scope.titleBread = 'Món ăn';
	$scope.url = "/api/product";
	
	$scope.insert = function(){
		$scope.titleTable = 'Thêm món mới';
	}
	
	$scope.edit = function(){
		$scope.titleTable = 'Cập nhật món';
	}

	$scope.insertCate = function(){
		$scope.titleTable = 'Thêm loại mới';
		
	}
	
	$scope.editCate = function(){
		$scope.titleTable = 'Cập nhật';
		
	}
	
	$scope.deleteP = function() {
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
				swalWithBootstrapButtons.fire(
					'Đã xóa',
					'Đã xóa thành công!',
					'success'
				)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			){}
		})
	}

	$scope.deleteC = function() {
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
				swalWithBootstrapButtons.fire(
					'Đã xóa',
					'Đã xóa thành công!',
					'success'
				)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			){}
		})
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
            $scope.formProduct.id = ($scope.products.length+1);
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
    
})