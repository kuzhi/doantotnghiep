app = angular.module("my_app", ["ngRoute"]);

// Định tuyến trang admin chủ cửa hàng
app.config(function($routeProvider) {
	$routeProvider
		// Kênh bán hàng
		.when("/sales-channel", {
			templateUrl: "/assets/admin/sales-channel/sales-channel.html",
			controller: "sales-channel-ctrl"
		})
		// Người hỗ trợ
		.when("/supporter", {
			templateUrl: "/assets/admin/supporter/supporter.html",
			controller: "supporter-ctrl"
		})
		// Phân quyền
		.when("/decentralization", {
			templateUrl: "/assets/admin/decentralization/decentralization.html",
			controller: "decentralization-ctrl"
		})
		// Người dùng
		.when("/user_admin", {
			templateUrl: "/assets/admin/user/user_admin.html",
			controller: "user-admin-ctrl"
		})
		.when("/user", {
			templateUrl: "/assets/admin/user/user.html",
			controller: "user-ctrl"
		})
		.when("/profile", {
			templateUrl: "/assets/admin/user/my-profile.html",
			controller: "myprofile-ctrl"
		})
		.when("/customs", {
			templateUrl: "/assets/user_store/manage/user_management.html",
			controller: "user__management-ctrl"
		})
		// Gói dịch vụ
		.when("/pack", {
			templateUrl: "/assets/admin/pack/pack.html",
			controller: "pack-ctrl"
		})
		.when("/orderpack", {
			templateUrl: "/assets/admin/pack/order-pack.html",
			controller: "order-pack-ctrl"
		})
		// Báo cáo
		.when("/report", {
			templateUrl: "/assets/admin/report/report.html",
			controller: "report-ctrl"
		})
		.when("/feedback", {
			templateUrl: "/assets/admin/report/feedback.html",
			controller: "feedback-ctrl"
		})
		.otherwise({
			templateUrl: "/assets/admin/sales-channel/sales-channel.html",
			controller: "sales-channel-ctrl"
		})
})
app.controller("admin-ctrl", function($scope, $http, $location) {
	// Láy userid
	//$scope.userid=0;
	$scope.getEmpleadoInfo = function () {
		// Lấy userid
        $http.get("/api/getUserApp")
	    .then(resp => {
	        $scope.userid = resp.data;
			console.log($scope.userid)
	       //$scope.userid = 2;
			$http.get("/api/userApp/get-user-app/"+$scope.userid).then(resp=>{
				$scope.userApp = resp.data;
				$scope.userApp.birthday = new Date($scope.userApp.birthday)
			})
			$http.get("/api/authorities/"+$scope.userid).then( (resp)=>{

				let userRole = [];
				userRole = resp.data; 
				userRole.
				if(userRole.permission)
			})
	    })
    }; $scope.getEmpleadoInfo();
    
});