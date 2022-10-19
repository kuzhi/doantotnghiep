app.controller("feedback-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Phản hồi từ khách hàng';
	
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