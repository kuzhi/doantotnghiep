app.controller("supporter-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Cấp quyền';
	$scope.titleBread = 'Phân công quản trị';
	
	
	$scope.edit = function(){
		$scope.titleTable = 'Cấp quyền quản trị cho kênh';
		
	}

	$scope.editCate = function(){
		$scope.titleTable = 'Cập nhật';
		
	}
	
	$scope.list = {
		suporter: [
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
			{
				id: '1000001',
				name: 'S-Chanel',
				username: 's-user',
				img: 'icon_food.png'
			},
		],
		
		user: [
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
			{
				id: 1,
				name: 'Nguyễn Văn An'
			},
		]
	}
	
})