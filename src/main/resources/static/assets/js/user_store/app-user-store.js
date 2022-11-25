app = angular.module("app-user-store", ["ngRoute"]);

// Định tuyến trang admin chủ cửa hàng
app.config(function($routeProvider) {
	$routeProvider
		// Thông tin cửa hàng
		.when("/name__store", {
			templateUrl: "/assets/user_store/info_store/name_store.html",
			controller: "name__store-ctrl",
		})
		.when("/myProfile", {
			templateUrl: "/assets/user_store/info_store/my-profile.html",
			controller: "myprofile-ctrl"
		})
		// Sản phẩm
		.when("/product__management", {
			templateUrl: "/assets/user_store/manage/product_management.html",
			controller: "product__management-ctrl"
		})
		// Đơn hàng
		.when("/order__management-all", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-all-ctrl"
		})
		.when("/order__management-loading", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-loading-ctrl"
		})
		.when("/order__management-confirmed", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-confirmed-ctrl"
		})
		.when("/order__management-success", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-success-ctrl"
		})
		.when("/order__management-canceled", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-canceled-ctrl"
		})
		.when("/order__management-becanceled", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-becanceled-ctrl"
		})
		// Nhân viên
		.when("/user__management", {
			templateUrl: "/assets/user_store/manage/user_management.html",
			controller: "user__management-ctrl"
		})
		// Báo cáo
		.when("/report-all", {
			templateUrl: "/assets/user_store/manage/report.html",
			controller: "report-all-ctrl"
		})
		.when("/report-sale-all", {
			templateUrl: "/assets/user_store/manage/report-sale.html",
			controller: "report-sale-ctrl"
		})
		.when("/report-product-all", {
			templateUrl: "/assets/user_store/manage/report-product.html",
			controller: "report-product-ctrl"
		})
		.when("/report-client-all", {
			templateUrl: "/assets/user_store/manage/report-client.html",
			controller: "report-client-ctrl"
		})
		.otherwise({
			templateUrl: "/assets/user_store/manage/report.html",
			controller: "report-all-ctrl"
		})
});

app.controller("app-ctrl", function($scope, $http, $location) {
	$scope.nameStore = "Pika Tea";
	$scope.addressStore = "Sóc Trăng";
	
	$scope.userid="";
	$scope.getEmpleadoInfo = function () {
        $http.get("/api/get")
	    .then(resp => {
	        $scope.userid = resp.data;
	    })
    }; $scope.getEmpleadoInfo();
});