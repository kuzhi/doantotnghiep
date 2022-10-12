app.controller("report-product-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Doanh thu sản phẩm';
	
	//List top 10
    $scope.productArr = {
		product: [
			{
				id: 'sp1',
				name: 'Gà rán',
				img: 'sp1.jpg',
				cate: 'KFC',
				price: 100000000
			},
			{
				id: 'sp2',
				name: 'Khoai tây chiên',
				img: 'sp3.jpeg',
				cate: 'KFC',
				price: 100000000
			},
			{
				id: 'sp3',
				name: 'Hamberger',
				img: 'sp4.jpeg',
				cate: 'KFC',
				price: 100000000
			},
			{
				id: 'sp1',
				name: 'Gà rán',
				img: 'sp1.jpg',
				cate: 'KFC',
				price: 100000000
			},
			{
				id: 'sp2',
				name: 'Khoai tây chiên',
				img: 'sp3.jpeg',
				cate: 'KFC',
				price: 100000000
			},
			{
				id: 'sp1',
				name: 'Gà rán',
				img: 'sp1.jpg',
				cate: 'KFC',
				price: 100000000
			},
			{
				id: 'sp2',
				name: 'Khoai tây chiên',
				img: 'sp3.jpeg',
				cate: 'KFC',
				price: 100000000
			},
			{
				id: 'sp3',
				name: 'Hamberger',
				img: 'sp4.jpeg',
				cate: 'KFC',
				price: 100000000
			},
			{
				id: 'sp1',
				name: 'Gà rán',
				img: 'sp1.jpg',
				cate: 'KFC',
				price: 100000000
			},
			{
				id: 'sp2',
				name: 'Khoai tây chiên',
				img: 'sp3.jpeg',
				cate: 'KFC',
				price: 100000000
			},
		]
	}
	
	// Biểu đồ doanh thu sản phẩm
    var ctx1 = $("#productChart").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: [
                        'Gà KFC', 'Khoai tây chiên',
                        'Gà KFC', 'Khoai tây chiên',
                        'Gà KFC', 'Khoai tây chiên',
                        'Gà KFC', 'Khoai tây chiên',
                        'Gà KFC', 'Khoai tây chiên',
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
