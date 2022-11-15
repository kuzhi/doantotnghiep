app.controller("name__store-ctrl", function($scope, $http, $location) {
    $scope.regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
	$scope.titleBread = 'Tên và liên hệ';
	$scope.titleBreadcrumb = 'Thông tin cửa hàng';
	$scope.url="/api/pack/";
	
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
	$scope.status = 1;
	
	// Load list pack
	$scope.packs=[];
	$scope.loadPack = function() {
		$http.get($scope.url).then(resp => { 
            $scope.packs = resp.data;
            
            $scope.packs.forEach(pack => { 
                pack.create_at = new Date(pack.create_at)
                pack.update_at = new Date(pack.update_at)
            })
        });
	}; $scope.loadPack();
})