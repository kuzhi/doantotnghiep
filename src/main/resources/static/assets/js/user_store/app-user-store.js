app = angular.module("app-user-store", ["ngRoute"]);

// Định tuyến trang admin chủ cửa hàng
app.config(function($routeProvider) {
	$routeProvider
		// Thông tin cửa hàng
		.when("/name__store", {
			templateUrl: "/assets/user_store/info_store/name_store.html",
			controller: "name__store-ctrl"
		})
		.when("/sales__time", {
			templateUrl: "/assets/user_store/info_store/sales_time.html",
			controller: "sales__time-ctrl"
		})
		.when("/business__form", {
			templateUrl: "/assets/user_store/info_store/business_form.html",
			controller: "business__form-ctrl"
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
		.when("/order__management-success", {
			templateUrl: "/assets/user_store/manage/order_management.html",
			controller: "order__management-success-ctrl"
		})
		// Nhân viên
		.when("/user__management", {
			templateUrl: "/assets/user_store/manage/user_management.html",
			controller: "user__management-ctrl"
		})
		.when("/authorization", {
			templateUrl: "/assets/user_store/manage/authorization.html",
			controller: "authorization-ctrl"
		})
		// Báo cáo
		.when("/report-all", {
			templateUrl: "/assets/user_store/manage/report.html",
			controller: "report-all-ctrl"
		})
		.when("/feedback__product", {
			templateUrl: "/assets/user_store/manage/feedback_product.html",
			controller: "feedback__product-ctrl"
		})
		.otherwise({
			templateUrl: "/assets/user_store/info_store/name_store.html",
			controller: "name__store-ctrl"
		})
})