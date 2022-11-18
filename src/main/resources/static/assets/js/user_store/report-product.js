app.controller("report-product-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Doanh thu sản phẩm';
	$scope.storeid = 2;
	
	// Biểu đồ doanh thu sản phẩm
	$scope.months = [
		{ id: 1, name: 'Tháng 1', }, 
		{ id: 2, name: 'Tháng 2', }, 
		{ id: 3, name: 'Tháng 3', }, 
		{ id: 4, name: 'Tháng 4', }, 
		{ id: 5, name: 'Tháng 5', }, 
		{ id: 6, name: 'Tháng 6', }, 
		{ id: 7, name: 'Tháng 7', }, 
		{ id: 8, name: 'Tháng 8', }, 
		{ id: 9, name: 'Tháng 9', }, 
		{ id: 10, name: 'Tháng 10', }, 
		{ id: 11, name: 'Tháng 11', }, 
		{ id: 12, name: 'Tháng 12', }
	];

	$scope.loadLabels = function(storeid) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(10);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(10);
		
		// Lấy labels
		$http.get("/api/report-product-app/"+storeid+"/"+$scope.dateStart+"/"+$scope.dateEnd).then(resp => {
			$scope.labels = [];
			$scope.labels = resp.data;
			
			// Lấy data
			$http.get("/api/report-product-app/data/product-id/"+storeid+"/"+$scope.dateStart+"/"+$scope.dateEnd).then(resp => {
				$scope.arrId = resp.data;

				$http.get("/api/report-product-app/data/product-id/data/"+storeid+"/"+$scope.dateStart+"/"+$scope.dateEnd+"/"+1).then(resp => {
					$scope.data = resp.data;
					console.log("data: ", $scope.data);
					
					var ctx1 = $("#productChart").get(0).getContext("2d");
				    var myChart1 = new Chart(ctx1, {
				        type: "bar",
				        data: {
				            labels: $scope.labels,
				            datasets: [{
				                    label: "Đơn vị (đồng)",
				                    data: 150,
				                    backgroundColor: "rgba(0, 84, 230, 90)"
				                },
				            ]
				            },
				        options: {
				            responsive: true,
				            indexAxis: 'y',
				            scales: {
				              y: {
				                grid: {
				                  drawOnChartArea: false
				                }
				              },
				              x: {
				                beginAtZero: true
				              }
				            }
				        }
				    });
				});
		    });
		});
	}; $scope.loadLabels($scope.storeid);
	
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
