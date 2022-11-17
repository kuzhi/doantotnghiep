app.controller("report-product-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Doanh thu sản phẩm';
	
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
	
	//List top 10
	$scope.items=[];
    $scope.report = function() {
		$http.get("/api/report-overview-app").then(resp => {
			$scope.items = resp.data
		});
	}
	
	$scope.pager = {
		page: 0,
		size: 10,
		get items() {
			var start = this.page * this.size;
			
			return $scope.items.slice(start, start + this.size);
			
		}
	}
	
	$scope.report();
})
