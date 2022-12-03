app.controller("decentralization-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Phân quyền';
	$scope.titleBread = 'Phân quyền';
	
	
		
	$scope.listFilter = [
		{ id: 1, name: "Fullname giảm dần A-Z" },
		{ id: 2, name: "Fullname tăng dần Z-A" },
	
	]

$scope.getUsersbyFilter = function () {
    // ======= A-Z
    if ($scope.list == 1) {
      $http.get("/api/userApp/" + "sort/a-z").then((resp) => {
        $scope.admins = resp.data;

        $scope.admins.forEach((us) => {
          us.create_at = new Date(us.create_at);
          us.update_at = new Date(us.update_at);
        });
      });
    }
    // ======= Z-A
    else if ($scope.list == 2) {
      $http.get("/api/userApp/" + "sort/z-a").then((resp) => {
        $scope.admins = resp.data;

        $scope.admins.forEach((us) => {
          us.create_at = new Date(us.create_at);
          us.update_at = new Date(us.update_at);
        });
      });
    }
  };

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
		}).catch(error => {
			//$location.path("/unauthorized");
		})
	}
	
	$scope.authority_of =  function(a, r){
		if($scope.authorities){
		
		console.log($scope.authorities)
			return $scope.authorities.find(ur =>				
						ur.userapp.id === a.id &&  ur.roleapp.id === r.id 
			);			
		}		
	}
	
	
	$scope.authority_changed = function(a, r){
		
		let authority = $scope.authority_of(a, r);
		
		if(authority){ // 	đã cấp quyền => thu hồi quyền (xóa)
			$scope.revoke_authority(authority);
		}else{ // chưa được cấp quyền => cấp quyền (thêm mới)
			authority = {userapp:a, roleapp:r, permission:r.roleName};
			console.log(authority)
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
			//var index = $scope.authorities.findIndex(a => a.id == authority.id);
			//$scope.authorities.push(index, 1);
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