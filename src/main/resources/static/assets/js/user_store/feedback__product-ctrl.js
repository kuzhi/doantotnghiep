app.controller("feedback__product-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Đánh giá sản phẩm';
	
	$scope.fiveS = {
		product5: [
			{
				id: '1',
				name: 'Gà',
				price: 15000,
				star: 5
			},
			{
				id: '1',
				name: 'Gà',
				price: 15000,
				star: 5
			},
			{
				id: '1',
				name: 'Gà',
				price: 15000,
				star: 5
			},
			{
				id: '1',
				name: 'Gà',
				price: 15000,
				star: 5
			},
			{
				id: '1',
				name: 'Gà',
				price: 15000,
				star: 5
			},
		]
	};
})