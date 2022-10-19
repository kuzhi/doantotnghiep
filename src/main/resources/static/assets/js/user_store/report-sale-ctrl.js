app.controller("report-sale-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Doanh thu bán hàng';

	// Any of the following formats may be used
	const ctx = document.getElementById('myChart');

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: [
				'Tháng 1',
				'Tháng 2',
				'Tháng 3',
				'Tháng 4',
				'Tháng 5',
				'Tháng 6',
				'Tháng 7',
				'Tháng 8',
				'Tháng 9',
				'Tháng 10',
				'Tháng 11',
				'Tháng 12',
			],
			datasets: [{
				label: 'Biểu đồ doanh thu 1 năm',
				data: [
					5000000,
					10000000,
					10000000,
					10000000,
					20000000,
					20000000,
					20000000,
					20000000,
					12345678,
					4321586,
					600000,
					10000000,
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
})