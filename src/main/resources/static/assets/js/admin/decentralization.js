app.controller("decentralization-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Phân quyền';
	$scope.titleBread = 'Phân quyền';
	
	$scope.list = {
		user: [
			{
				fullname: 'Nguyễn Văn An',
				img: 'user.jpg',
				email: 'annv@gmail.com',
				gender: true,
				admin: false
			},
			{
				fullname: 'Nguyễn Văn An',
				img: 'user.jpg',
				email: 'annv@gmail.com',
				gender: true,
				admin: false
			},
			{
				fullname: 'Nguyễn Văn An',
				img: 'user.jpg',
				email: 'annv@gmail.com',
				gender: true,
				admin: false
			},
			{
				fullname: 'Nguyễn Văn An',
				img: 'user.jpg',
				email: 'annv@gmail.com',
				gender: true,
				admin: false
			},
			{
				fullname: 'Nguyễn Văn An',
				img: 'user.jpg',
				email: 'annv@gmail.com',
				gender: true,
				admin: false
			},
		]
	}
		
	$scope.listFilter = [
		{ id: 1, name: "Fullname giảm dần A-Z" },
		{ id: 2, name: "Fullname tăng dần Z-A" },
		{ id: 3, name: "Giới tính nam" },
		{ id: 4, name: "Giới tính nữ" },
	]
	

$scope.roles = [];
	$scope.admins = [];
	$scope.authorities = [];

	$scope.initialize = function() {
		$http.get("/api/roles").then(resp => {
			$scope.roles = resp.data;
		})
		
		$http.get("/api/userApp/getamin?admin=true").then(resp => {
			$scope.admins = resp.data;			
		})
		
		$http.get("/api/authorities?admin=true").then(resp => {
			$scope.authorities = resp.data;
			console.log("item", $scope.authorities);
		}).catch(error => {
			//$location.path("/unauthorized");
		})
	}
	
	$scope.authority_of = function(a, r){
		if($scope.authorities){
			return $scope.authorities.find(ur => 
				ur.nguoiDung.id == a.id && ur.role.id == r.id
			);
		}
	}
	
	$scope.authority_changed = function(a, r){
		var authority = $scope.authority_of(a, r);
		if(authority){ // 	đã cấp quyền => thu hồi quyền (xóa)
			$scope.revoke_authority(authority);
		}else{ // chưa được cấp quyền => cấp quyền (thêm mới)
			authority = {nguoiDung:a, role:r};
			$scope.grant_authority(authority);
		}
	}
	
	// cấp quyền
	$scope.grant_authority = function(authority){
		$http.post(`/api/authorities`, authority).then(resp => {
			$scope.authorities.push(resp.data)
			// Thông báo
			Swal.fire({
				icon: 'success',
				title: 'Cấp quyền thành công!'
			});
			$scope.initialize();
		}).catch(error => {
			// Thông báo
			Swal.fire({
				icon: 'error',
				title: 'Cấp quyền thất bại!'
			});
			$scope.initialize();
			console.log("Error", error);
		})
	}
	
	// hủy quyền
	$scope.revoke_authority = function(authority){
		$http.delete(`/api/authorities/${authority.id}`).then(resp => {
			var index = $scope.authorities.findIndex(a => a.id == authority.id);
			$scope.authorities.push(index, 1);
			// Thông báo
			Swal.fire({
				icon: 'success',
				title: 'Thu hồi quyền thành công!'
			});
			$scope.initialize();
		}).catch(error => {
			// Thông báo
			Swal.fire({
				icon: 'error',
				title: 'Thu hồi quyền thất bại!'
			});
			$scope.initialize();
			console.log("Error", error);
		})
	}
	
	$scope.initialize();

})