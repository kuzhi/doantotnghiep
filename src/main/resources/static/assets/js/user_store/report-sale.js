app.controller("report-sale-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Doanh thu bán hàng';
	$scope.storeid =2;
	
	// Biểu đồ bán hàng
	$scope.dateStart;
	$scope.dateEnd;
	$scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	$scope.loadDataMonth = function(storeid, dateStart, dateEnd) {
		dateStart = $scope.dateStart.getMonth()+1;
		dateEnd = $scope.dateEnd.getMonth()+1;
		
		// Lấy mốc thời gian
		let newMonths = $scope.months.filter(month => month >= dateStart && month <= dateEnd);
		
		
		var ctx2 = $("#saleChart").get(0).getContext("2d");
	    var myChart2 = new Chart(ctx2, {
	        type: "bar",
	        data: {
	            labels: newMonths,
	            datasets: [{
	                    label: "Doanh thu ($$)",
	                    data: [
	                        150, 300, 550, 650, 60, 800, 950,
	                    ],
	                    backgroundColor: "rgba(0, 84, 230, 90)"
	                }
	            ]
	            },
	        options: {
	            responsive: true
	        }
	    });
	};

})

