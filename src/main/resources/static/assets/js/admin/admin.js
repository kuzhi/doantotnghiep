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