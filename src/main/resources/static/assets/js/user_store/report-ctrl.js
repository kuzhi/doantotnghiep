app.controller("report-all-ctrl", function($scope, $http, $location) {
	$scope.storeid = 2;
	
	// Worldwide Sales Chart
	var month = [0,1,2,3,4,5,6,7,8,9,10,11];
	function loadOrder11() {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		var dateStart = new Date();
		var dateEnd = new Date();
		
		for(let i=0; i<month.length; i++){
			dateStart.setTime(exampleDate.getTime()); dateStart.setDate(1); dateStart.setMonth(i);
			// console.log('dateS: ', dateStart);			
			dateEnd.setTime(exampleDate.getTime() + end); 
			if(i==1){
				dateEnd.setDate(28); 
			}
			// else if(i==0 || i==2 || i == 4 || i == 6 || i == 7 || i == 9 || i == 11) {
				// dateEnd.setDate(30); 				
			// }
			else{
				dateEnd.setDate(30); 								
			}
			dateEnd.setMonth(i);				
			// console.log('dateE: ', dateEnd);		
				
			$http.get("/api/count/order/" + $scope.storeid + "/"  + dateStart + "/" +  dateEnd)
			.then(resp => {
				$scope.countMonth = resp.data;
				console.log('data:', $scope.countMonth)
				
				$scope.data = {
					labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
					datasets: [
						{
							label: "Thành công",
							data: [
			                    $scope.countMonth
			                ],
			                color: "#BCFEFE",
			                backgroundColor: "rgba(34, 230, 0, 90)"
						},
						{
							label: "Bị hủy",
			                data: [
			                    8, 35, 40, 60, 70, 55, 75,
			                    8, 35, 40, 60, 70, 55, 75
			                ],
			                color: "#BCFEFE",
			                backgroundColor: "rgba(255, 21, 48, 100)"
						}
					]
				}
			})
			.catch(error => {
	            console.log('error: ', error)
	        })
		}
		
	}; loadOrder11();
	
	var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: $scope.data.labels,
            datasets: $scope.data.datasets
            },
        options: {
            responsive: true
        }
    });
	
    // Salse & Revenue Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
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
    
    // Hóa đơn || Doanh thu trong ngày
    $scope.getOrderInDate = function(storeid) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		
		$scope.dateStart.setTime(exampleDate.getTime());
		$scope.dateEnd.setTime(exampleDate.getTime() + end);
		
		$http.get("/api/count/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
		.then(resp => {
			$scope.orderInDate = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}
	
	$scope.getSaleOrderInDate = function(storeid) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		
		$scope.dateStart.setTime(exampleDate.getTime());
		$scope.dateEnd.setTime(exampleDate.getTime() + end);
		
		$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
		.then(resp => {
			$scope.saleorderInDate = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}
	
	$scope.getSaleOrderInDate($scope.storeid);
	$scope.getOrderInDate($scope.storeid);
    
    // Hóa đơn || Doanh thu trong tháng
    $scope.getOrderInMonth = function(storeid) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		$scope.month = new Date().getMonth()+1;
		
		$scope.dateStart.setTime(exampleDate.getTime());
		$scope.dateStart.setDate(1);
		$scope.dateEnd.setTime(exampleDate.getTime() + end);
		$scope.dateEnd.setDate(30);
		
		$http.get("/api/count/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
		.then(resp => {
			$scope.orderInMonth = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}
	
	$scope.getSaleOrderInMonth = function(storeid) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		$scope.month = new Date().getMonth()+1;
		
		$scope.dateStart.setTime(exampleDate.getTime());
		$scope.dateStart.setDate(1);
		$scope.dateEnd.setTime(exampleDate.getTime() + end);
		$scope.dateEnd.setDate(30);
		
		$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
		.then(resp => {
			$scope.saleorderInMonth = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}
	
	$scope.getSaleOrderInMonth($scope.storeid);
	$scope.getOrderInMonth($scope.storeid);
    
    //List top 5
    $scope.items=[];
    $scope.report = function() {
		$http.get("/api/report-overview-app").then(resp => {
			$scope.items = resp.data
		});
	}
	
	$scope.pager = {
		page: 0,
		size: 5,
		get items() {
			var start = this.page * this.size;
			
			return $scope.items.slice(start, start + this.size);
			
		}
	}
	
	$scope.report();
})
