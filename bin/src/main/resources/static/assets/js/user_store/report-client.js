app.controller("report-client-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Doanh thu khách hàng';
	
	//List top 10
    $scope.userArr = {
		user: [
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
			{
				id: 'us1',
				name: 'Huỳnh Chí Linh',
				img: 'user.jpg',
				gender: true,
				order: 1000
			},
		]
	}
	
	// Biểu đồ doanh thu khách hàng
    var ctx1 = $("#userChart").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: [
                        'Huỳnh Chí Linh',
                        'Huỳnh Chí Linh',
                        'Huỳnh Chí Linh',
                        'Huỳnh Chí Linh',
                        'Huỳnh Chí Linh',
                        'Huỳnh Chí Linh',
                        'Huỳnh Chí Linh',
                        'Huỳnh Chí Linh',
                        'Huỳnh Chí Linh',
                        'Huỳnh Chí Linh',
                    ],
            datasets: [{
                    label: "Đơn vị (đồng)",
                    data: [
                        10000, 20000, 30000, 40000, 50000,
                        60000, 70000, 80000, 90000, 100000,
                    ],
                    backgroundColor: "rgba(0, 84, 230, 90)"
                },
            ]
            },
        options: {
            responsive: true,
            indexAxis: 'y',
        }
    });
})
