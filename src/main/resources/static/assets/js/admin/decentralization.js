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
	
})