app.controller("report-ctrl", function($scope, $http, $location) {
    $scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Tổng quan';
	
	// Số gói được đăng ký hôm nay
	$scope.loadPackDate = function() {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		
		$scope.dateStart.setTime(exampleDate.getTime());
		$scope.dateEnd.setTime(exampleDate.getTime() + end);
		
		$http.get("/api/report-orderpack/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + 3)
		.then(resp => {
			$scope.packForDay = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadPackDate();
	
	// Số gói được đăng ký tháng này
	const now = new Date();
	$scope.monthNow = now.getMonth()+1;
	$scope.loadPackMonth = function(year, month) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date(year, month);
		$scope.dateEnd = new Date(year, month);
		
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(month);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(0); $scope.dateEnd.setMonth(month);
		
		$http.get("/api/report-orderpack/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + 3)
		.then(resp => {
			$scope.packForMonth = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadPackMonth(now.getFullYear(), now.getMonth());

	// Số gói được đăng ký năm này
	$scope.yearNow = now.getFullYear();
	$scope.loadPackYear = function(year) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date(year);
		$scope.dateEnd = new Date(year);
		
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(0);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(11);
		
		$http.get("/api/report-orderpack/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + 3)
		.then(resp => {
			$scope.packForYear = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadPackYear(now.getFullYear());

	// Load gói theo trạng thái
	$scope.loadPackLoading = function(status) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(0);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(11);
		
		$http.get("/api/report-orderpack/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + status)
		.then(resp => {
			$scope.packLoading = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadPackLoading(1);
	$scope.loadPackSuccess = function(status) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(0);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(11);
		
		$http.get("/api/report-orderpack/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + status)
		.then(resp => {
			$scope.packSuccess = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadPackSuccess(3);
	$scope.loadPackCancel = function(status) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(0);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(11);
		
		$http.get("/api/report-orderpack/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + status)
		.then(resp => {
			$scope.packCancel = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadPackCancel(4);
	$scope.loadPackCanceled = function(status) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(0);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(11);
		
		$http.get("/api/report-orderpack/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + status)
		.then(resp => {
			$scope.packCanceled = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadPackCanceled(5);
	
	// Load doanh thu hôm nay
	$scope.loadDTDate = function() {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date();
		$scope.dateEnd = new Date();
		
		$scope.dateStart.setTime(exampleDate.getTime());
		$scope.dateEnd.setTime(exampleDate.getTime() + end);
		
		$http.get("/api/report-orderpack-sale/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + 3)
		.then(resp => {
			$scope.DTForDay = resp.data;
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadDTDate();
	// Load doanh thu tháng này
	$scope.loadDTMonth = function(year, month) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date(year, month);
		$scope.dateEnd = new Date(year, month);
		
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(month);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(0); $scope.dateEnd.setMonth(month);
		
		$http.get("/api/report-orderpack-sale/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + 3)
		.then(resp => {
			$scope.data = resp.data;
			$scope.DTForMonth=0;
			for(let i in $scope.data) {
				$scope.DTForMonth += $scope.data[i].total
			}
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadDTMonth(now.getFullYear(), now.getMonth());
	
	// Load doanh thu theo tháng
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
	
	$scope.month = now.getMonth()+1;
	$scope.getReportByMonth = function() {
		// ======= Tháng 1
		if ($scope.list == 1) {
			$scope.month = 1;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(0)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 2
		else if ($scope.list == 2) {
			$scope.month = 2;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(1)), 1, now.getDate(now.setDate(28)));
		}
		// ======= Tháng 3
		else if ($scope.list == 3) {
			$scope.month = 3;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(2)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 4
		else if ($scope.list == 4) {
			$scope.month = 4;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(3)), 1, now.getDate(now.setDate(30)));
		}
		// ======= Tháng 5
		if ($scope.list == 5) {
			$scope.month = 5;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(4)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 6
		else if ($scope.list == 6) {
			$scope.month = 6;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(5)), 1, now.getDate(now.setDate(30)));
		}
		// ======= Tháng 7
		else if ($scope.list == 7) {
			$scope.month = 7;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(6)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 8
		else if ($scope.list == 8) {
			$scope.month = 8;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(7)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 9
		if ($scope.list == 9) {
			$scope.month = 9;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(8)), 1, now.getDate(now.setDate(30)));
		}
		// ======= Tháng 10
		else if ($scope.list == 10) {
			$scope.month = 10;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(9)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 11
		else if ($scope.list == 11) {
			$scope.month = 11;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(10)), 1, now.getDate(now.setDate(30)));
		}
		// ======= Tháng 12
		else if ($scope.list == 12) {
			$scope.month = 12;
			$scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(11)), 1, now.getDate(now.setDate(0)));
		}
	}
	
	$scope.loadDTForMonth = function(year, month) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		$scope.dateStart = new Date(year, month);
		$scope.dateEnd = new Date(year, month);
		
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(month);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(0); $scope.dateEnd.setMonth(month);
		
		$http.get("/api/report-orderpack-sale/" + $scope.dateStart + "/" +  $scope.dateEnd + "/" + 3)
		.then(resp => {
			$scope.datas = resp.data;
			$scope.DTForMonthNow=0;
			for(let i in $scope.datas) {
				$scope.DTForMonthNow += $scope.datas[i].total
			}
			console.log($scope.DTForMonthNow)
		})
		.catch(error => {
            console.log('error: ', error)
        })
	}; $scope.loadDTForMonth(now.getFullYear(), now.getMonth(now.setMonth(10)), 1, now.getDate(now.setDate(0)));
})
