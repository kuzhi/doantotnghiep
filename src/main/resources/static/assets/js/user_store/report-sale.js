app.controller("report-sale-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Doanh thu bán hàng';
	
	// Biểu đồ bán hàng
    var ctx2 = $("#saleChart").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "bar",
        data: {
            labels: [
                        '1', '2', '3', '4', '5', '6',
                        '7', '8', '9', '10', '11', '12'
                    ],
            datasets: [{
                    label: "Doanh thu ($$)",
                    data: [
                        150, 300, 550, 650, 60, 800, 950,
                        150, 300, 550, 650, 60, 800, 950
                    ],
                    backgroundColor: "rgba(0, 84, 230, 90)"
                }
            ]
            },
        options: {
            responsive: true
        }
    });
})

