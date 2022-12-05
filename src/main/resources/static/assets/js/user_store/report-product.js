app.controller("report-product-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Sản phẩm';

	const now = new Date();

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

	$scope.getReportByMonth = function() {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end = 24 * 60 * 60 * 1000 - 1;

		// ======= Tháng 1
		if ($scope.list == 1) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(0)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 2
		else if ($scope.list == 2) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(1)), 1, now.getDate(now.setDate(28)));
		}
		// ======= Tháng 3
		else if ($scope.list == 3) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(2)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 4
		else if ($scope.list == 4) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(3)), 1, now.getDate(now.setDate(30)));
		}
		// ======= Tháng 5
		if ($scope.list == 5) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(4)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 6
		else if ($scope.list == 6) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(5)), 1, now.getDate(now.setDate(30)));
		}
		// ======= Tháng 7
		else if ($scope.list == 7) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(6)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 8
		else if ($scope.list == 8) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(7)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 9
		if ($scope.list == 9) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(8)), 1, now.getDate(now.setDate(30)));
		}
		// ======= Tháng 10
		else if ($scope.list == 10) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(9)), 1, now.getDate(now.setDate(0)));
		}
		// ======= Tháng 11
		else if ($scope.list == 11) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(10)), 1, now.getDate(now.setDate(30)));
		}
		// ======= Tháng 12
		else if ($scope.list == 12) {
			$scope.load(now.getFullYear(), now.getMonth(now.setMonth(11)), 1, now.getDate(now.setDate(0)));
		}
	}

	// Biểu đồ
	$scope.load = function(year, month, dateStart, dateEnd) {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/getStoreToken").then(resp => {
					const storeid = resp.data;

					const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
					const end = 24 * 60 * 60 * 1000 - 1;

					$scope.dateStart = new Date(year, month);
					$scope.dateEnd = new Date(year, month);

					// Tháng 1
					$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(dateStart); $scope.dateStart.setMonth(month);
					$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(dateEnd); $scope.dateEnd.setMonth(month);

					$http.get("/api/report-product-app/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd).then(resp => {
						$scope.datas = resp.data;

						$scope.labels = [];
						for (let i in $scope.datas) {
							$scope.labels.push($scope.datas[i].name);
						}

						$scope.data = [];
						for (let i in $scope.datas) {
							$scope.data.push($scope.datas[i].total);
						}

						if (window.myChart2 instanceof Chart) {
							window.myChart2.destroy();
						}
						month += 1;

						var ctx1 = $("#productChart").get(0).getContext("2d");
						window.myChart2 = new Chart(ctx1, {
							type: "bar",
							data: {
								labels: $scope.labels,
								datasets: [{
									label: "Doanh thu tháng " + month,
									data: $scope.data,
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
	}; $scope.load(now.getFullYear(), now.getMonth(), 1, now.getDate(now.setDate(30)));

	//List top 10
	$scope.items = [];
	$scope.report = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/getStoreToken").then(resp => {
					const storeid = resp.data;
					$http.get("/api/report-overview-app/" + storeid).then(resp => {
						$scope.items = resp.data
					});
				});
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
