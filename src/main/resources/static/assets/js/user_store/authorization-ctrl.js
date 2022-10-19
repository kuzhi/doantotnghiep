app.controller("authorization-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Nhân viên';
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
})