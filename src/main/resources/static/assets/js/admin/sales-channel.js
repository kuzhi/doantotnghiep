app.controller("sales-channel-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Kênh bán hàng';
	$scope.titleBread = 'Kênh quản lý';
	
	$scope.list = {
		chanel: [
			{
				id: '10000000001',
				name: 'S-Chanel',
				address: 'TP.Hồ Chí Minh',
				phone: '0942.xxx.xxx'
			},
			{
				id: '10000000001',
				name: 'S-Chanel',
				address: 'TP.Hồ Chí Minh',
				phone: '0942.xxx.xxx'
			},
			{
				id: '10000000001',
				name: 'S-Chanel',
				address: 'TP.Hồ Chí Minh',
				phone: '0942.xxx.xxx'
			},
			{
				id: '10000000001',
				name: 'S-Chanel',
				address: 'TP.Hồ Chí Minh',
				phone: '0942.xxx.xxx'
			},
			{
				id: '10000000001',
				name: 'S-Chanel',
				address: 'TP.Hồ Chí Minh',
				phone: '0942.xxx.xxx'
			},
			{
				id: '10000000001',
				name: 'S-Chanel',
				address: 'TP.Hồ Chí Minh',
				phone: '0942.xxx.xxx'
			},
			{
				id: '10000000001',
				name: 'S-Chanel',
				address: 'TP.Hồ Chí Minh',
				phone: '0942.xxx.xxx'
			},
			{
				id: '10000000001',
				name: 'S-Chanel',
				address: 'TP.Hồ Chí Minh',
				phone: '0942.xxx.xxx'
			},
		]
	}
	
	$scope.listFilter = [
		{ id: 1, name: "Fullname giảm dần A-Z" },
		{ id: 2, name: "Fullname tăng dần Z-A" },
		{ id: 3, name: "Giới tính nam" },
		{ id: 4, name: "Giới tính nữ" },
	]
})