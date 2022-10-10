app.controller("report-all-ctrl", function($scope, $http, $location) {
	// Worldwide Sales Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: [
                        '1', '2', '3', '4', '5', '6',
                        '7', '8', '9', '10', '11', '12'
                    ],
            datasets: [{
                    label: "Hoàn thành",
                    data: [
                        150, 300, 550, 650, 60, 800, 950,
                        150, 300, 550, 650, 60, 800, 950
                    ],
                    backgroundColor: "rgba(34, 230, 0, 90)"
                },
                {
                    label: "Bị hủy",
                    data: [
                        8, 35, 40, 60, 70, 55, 75,
                        8, 35, 40, 60, 70, 55, 75
                    ],
                    backgroundColor: "rgba(255, 21, 48, 100)"
                }
            ]
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
})
