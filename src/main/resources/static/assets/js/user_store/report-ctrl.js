app.controller("report-all-ctrl", function($scope, $http, $location) {
	const now = new Date();

	//================ Hóa đơn đang xử lý
	$scope.loadOrderLoading = function(year, month) {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				console.log(resp.data)
				// Lấy storeid
				$http.get("/api/getStoreToken").then(resp => {
					console.log(resp.data)
						const storeid = resp.data;

						const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
						const end = 24 * 60 * 60 * 1000 - 1;

						$scope.dateStart = new Date(year, month);
						$scope.dateEnd = new Date(year, month);

						$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(month);
						$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(0); $scope.dateEnd.setMonth(month);

						$http.get("/api/count-number/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 1)
							.then(resp => {
								$scope.orderLoading = resp.data;
							})
							.catch(error => {
								console.log('error: ', error)
							})
					})
			})
	}; $scope.loadOrderLoading(now.getFullYear(), now.getMonth());

	//================ Hóa đơn thành công
	$scope.loadOrderSuccess = function(year, month) {
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

						$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(month);
						$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(0); $scope.dateEnd.setMonth(month);

						$http.get("/api/count-number/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
							.then(resp => {
								$scope.orderSuccess = resp.data;
							})
							.catch(error => {
								console.log('error: ', error)
							})
					})
			})
	}; $scope.loadOrderSuccess(now.getFullYear(), now.getMonth());
	//================ Hóa đơn bị hủy
	$scope.loadOrderCancel = function(year, month) {
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

						$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(month);
						$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(0); $scope.dateEnd.setMonth(month);

						$http.get("/api/count-number/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 4)
							.then(resp => {
								$scope.orderCancel = resp.data;
							})
							.catch(error => {
								console.log('error: ', error)
							})
					})
			})
	}; $scope.loadOrderCancel(now.getFullYear(), now.getMonth());
	//================ Hóa đơn đã hủy
	$scope.loadOrderCanceled = function(year, month) {
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

						$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(month);
						$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(0); $scope.dateEnd.setMonth(month);

						$http.get("/api/count-number/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
							.then(resp => {
								$scope.orderCanceled = resp.data;
							})
							.catch(error => {
								console.log('error: ', error)
							})
					})
			})
	}; $scope.loadOrderCanceled(now.getFullYear(), now.getMonth());

	//================ Biểu đồ hóa đơn
	$scope.loadDataOrder = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/getStoreToken").then(resp => {
					const storeid = resp.data;

					const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
					const end = 24 * 60 * 60 * 1000 - 1;

					$scope.dateStart = new Date();
					$scope.dateEnd = new Date();

					// Tháng 1
					$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(0);
					$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(0);

					$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
						.then(resp => {
							$scope.data1 = resp.data;
							$scope.data1 = Math.ceil(1.0 * $scope.data1.length)

							// Tháng 2
							$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(1);
							$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(28); $scope.dateEnd.setMonth(1);

							$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
								.then(resp => {
									$scope.data2 = resp.data;
									$scope.data2 = Math.ceil(1.0 * $scope.data2.length)

									// Tháng 3
									$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(2);
									$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(2);

									$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
										.then(resp => {
											$scope.data3 = resp.data;
											$scope.data3 = Math.ceil(1.0 * $scope.data3.length)

											// Tháng 4
											$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(3);
											$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(3);

											$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
												.then(resp => {
													$scope.data4 = resp.data;
													$scope.data4 = Math.ceil(1.0 * $scope.data4.length)

													// Tháng 5
													$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(4);
													$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(4);

													$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
														.then(resp => {
															$scope.data5 = resp.data;
															$scope.data5 = Math.ceil(1.0 * $scope.data5.length)

															// Tháng 6
															$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(5);
															$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(5);

															$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
																.then(resp => {
																	$scope.data6 = resp.data;
																	$scope.data6 = Math.ceil(1.0 * $scope.data6.length)

																	// Tháng 7
																	$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(6);
																	$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(6);

																	$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
																		.then(resp => {
																			$scope.data7 = resp.data;
																			$scope.data7 = Math.ceil(1.0 * $scope.data7.length)

																			// Tháng 8
																			$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(7);
																			$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(7);

																			$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
																				.then(resp => {
																					$scope.data8 = resp.data;
																					$scope.data8 = Math.ceil(1.0 * $scope.data8.length)

																					// Tháng 9
																					$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(8);
																					$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(8);

																					$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
																						.then(resp => {
																							$scope.data9 = resp.data;
																							$scope.data9 = Math.ceil(1.0 * $scope.data9.length)

																							// Tháng 10
																							$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(9);
																							$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(9);

																							$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
																								.then(resp => {
																									$scope.data10 = resp.data;
																									$scope.data10 = Math.ceil(1.0 * $scope.data10.length)

																									// Tháng 11
																									$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(10);
																									$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(10);

																									$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
																										.then(resp => {
																											$scope.data11 = resp.data;
																											$scope.data11 = Math.ceil(1.0 * $scope.data11.length)
																											// Tháng 12
																											$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(11);
																											$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(11);

																											$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 3)
																												.then(resp => {
																													$scope.data12 = resp.data;
																													$scope.data12 = Math.ceil(1.0 * $scope.data12.length)

																													// Tháng 12
																													$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(11);
																													$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(11);

																													$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																														.then(resp => {
																															$scope.dataF12 = resp.data;
																															$scope.dataF12 = Math.ceil(1.0 * $scope.dataF12.length)

																															// Tháng 11
																															$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(10);
																															$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(10);

																															$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																.then(resp => {
																																	$scope.dataF11 = resp.data;
																																	$scope.dataF11 = Math.ceil(1.0 * $scope.dataF11.length)

																																	// Tháng 10
																																	$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(9);
																																	$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(9);

																																	$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																		.then(resp => {
																																			$scope.dataF10 = resp.data;
																																			$scope.dataF10 = Math.ceil(1.0 * $scope.dataF10.length)

																																			// Tháng 9
																																			$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(8);
																																			$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(8);

																																			$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																				.then(resp => {
																																					$scope.dataF9 = resp.data;
																																					$scope.dataF9 = Math.ceil(1.0 * $scope.dataF9.length)

																																					// Tháng 8
																																					$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(7);
																																					$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(7);

																																					$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																						.then(resp => {
																																							$scope.dataF8 = resp.data;
																																							$scope.dataF8 = Math.ceil(1.0 * $scope.dataF8.length)

																																							// Tháng 7
																																							$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(6);
																																							$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(6);

																																							$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																								.then(resp => {
																																									$scope.dataF7 = resp.data;
																																									$scope.dataF7 = Math.ceil(1.0 * $scope.dataF7.length)

																																									// Tháng 6
																																									$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(5);
																																									$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(5);

																																									$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																										.then(resp => {
																																											$scope.dataF6 = resp.data;
																																											$scope.dataF6 = Math.ceil(1.0 * $scope.dataF6.length)

																																											// Tháng 5
																																											$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(4);
																																											$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(4);

																																											$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																												.then(resp => {
																																													$scope.dataF5 = resp.data;
																																													$scope.dataF5 = Math.ceil(1.0 * $scope.dataF5.length)

																																													// Tháng 4
																																													$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(3);
																																													$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(3);

																																													$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																														.then(resp => {
																																															$scope.dataF4 = resp.data;
																																															$scope.dataF4 = Math.ceil(1.0 * $scope.dataF4.length)

																																															// Tháng 3
																																															$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(2);
																																															$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(2);

																																															$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																																.then(resp => {
																																																	$scope.dataF3 = resp.data;
																																																	$scope.dataF3 = Math.ceil(1.0 * $scope.dataF3.length)

																																																	// Tháng 2
																																																	$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(1);
																																																	$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(28); $scope.dateEnd.setMonth(1);

																																																	$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																																		.then(resp => {
																																																			$scope.dataF2 = resp.data;
																																																			$scope.dataF2 = Math.ceil(1.0 * $scope.dataF2.length)

																																																			// Tháng 1
																																																			$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(0);
																																																			$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(0);

																																																			$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd + "/" + 5)
																																																				.then(resp => {
																																																					$scope.dataF1 = resp.data;
																																																					$scope.dataF1 = Math.ceil(1.0 * $scope.dataF1.length)

																																																					var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
																																																					var myChart1 = new Chart(ctx1, {
																																																						type: "bar",
																																																						data: {
																																																							labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
																																																							datasets: [
																																																								{
																																																									label: "Thành công",
																																																									data: [$scope.data1, $scope.data2, $scope.data3, $scope.data4, $scope.data5, $scope.data6,
																																																									$scope.data7, $scope.data8, $scope.data9, $scope.data10, $scope.data11, $scope.data12],
																																																									color: "#BCFEFE",
																																																									backgroundColor: "rgba(34, 230, 0, 90)"
																																																								},
																																																								{
																																																									label: "Bị hủy",
																																																									data: [$scope.dataF1, $scope.dataF2, $scope.dataF3, $scope.dataF4, $scope.dataF5, $scope.dataF6,
																																																									$scope.dataF7, $scope.dataF8, $scope.dataF9, $scope.dataF10, $scope.dataF11, $scope.dataF12],
																																																									color: "#BCFEFE",
																																																									backgroundColor: "rgba(255, 21, 48, 100)"
																																																								}
																																																							]
																																																						},
																																																						options: {
																																																							responsive: true,
																																																							scales: {
																																																								x: {
																																																									grid: {
																																																										drawOnChartArea: false
																																																									}
																																																								},
																																																								y: {
																																																									beginAtZero: true
																																																								}
																																																							}
																																																						}
																																																					});
																																																					// Tháng 1
																																																				})
																																																				.catch(error => {
																																																					console.log('error: ', error)
																																																				})
																																																			// Tháng 2
																																																		})
																																																		.catch(error => {
																																																			console.log('error: ', error)
																																																		})
																																																	// Tháng 3
																																																})
																																																.catch(error => {
																																																	console.log('error: ', error)
																																																})
																																															// Tháng 4
																																														})
																																														.catch(error => {
																																															console.log('error: ', error)
																																														})
																																													// Tháng 5
																																												})
																																												.catch(error => {
																																													console.log('error: ', error)
																																												})
																																											// Tháng 6
																																										})
																																										.catch(error => {
																																											console.log('error: ', error)
																																										})
																																									// Tháng 7
																																								})
																																								.catch(error => {
																																									console.log('error: ', error)
																																								})
																																							// Tháng 8
																																						})
																																						.catch(error => {
																																							console.log('error: ', error)
																																						})
																																					// Tháng 9
																																				})
																																				.catch(error => {
																																					console.log('error: ', error)
																																				})
																																			// Tháng 10
																																		})
																																		.catch(error => {
																																			console.log('error: ', error)
																																		})
																																	// Tháng 11
																																})
																																.catch(error => {
																																	console.log('error: ', error)
																																})
																															// Tháng 12
																														})
																														.catch(error => {
																															console.log('error: ', error)
																														})
																													// Tháng 12
																												})
																												.catch(error => {
																													console.log('error: ', error)
																												})
																											// Tháng 11
																										})
																										.catch(error => {
																											console.log('error: ', error)
																										})
																									// Tháng 10
																								})
																								.catch(error => {
																									console.log('error: ', error)
																								})
																							// Tháng 9
																						})
																						.catch(error => {
																							console.log('error: ', error)
																						})
																					// Tháng 8
																				})
																				.catch(error => {
																					console.log('error: ', error)
																				})
																			// Tháng 7
																		})
																		.catch(error => {
																			console.log('error: ', error)
																		})
																	// Tháng 6
																})
																.catch(error => {
																	console.log('error: ', error)
																})
															// Tháng 5
														})
														.catch(error => {
															console.log('error: ', error)
														})
													// Tháng 4
												})
												.catch(error => {
													console.log('error: ', error)
												})
											// Tháng 3
										})
										.catch(error => {
											console.log('error: ', error)
										})
									// Tháng 2
								})
								.catch(error => {
									console.log('error: ', error)
								})
							// Tháng 1        
						})
						.catch(error => {
							console.log('error: ', error)
						})
				})
			})
	}; $scope.loadDataOrder();

	//================ Biểu đồ doanh thu
	$scope.loadDataSale = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/getStoreToken").then(resp => {
						const storeid = resp.data;

						const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
						const end = 24 * 60 * 60 * 1000 - 1;

						$scope.dateStart = new Date();
						$scope.dateEnd = new Date();

						// Tháng 1
						$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(0);
						$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(0);

						$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
							.then(resp => {
								$scope.dataS1 = resp.data;
								if ($scope.dataS1 == "") { $scope.dataS1 = 0 }

								// Tháng 2
								$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(1);
								$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(28); $scope.dateEnd.setMonth(1);

								$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
									.then(resp => {
										$scope.dataS2 = resp.data;
										if ($scope.dataS2 == "") { $scope.dataS2 = 0 }

										// Tháng 3
										$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(2);
										$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(2);

										$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
											.then(resp => {
												$scope.dataS3 = resp.data;
												if ($scope.dataS3 == "") { $scope.dataS3 = 0 }

												// Tháng 4
												$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(3);
												$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(3);

												$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
													.then(resp => {
														$scope.dataS4 = resp.data;
														if ($scope.dataS4 == "") { $scope.dataS4 = 0 }

														// Tháng 5
														$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(4);
														$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(4);

														$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
															.then(resp => {
																$scope.dataS5 = resp.data;
																if ($scope.dataS5 == "") { $scope.dataS5 = 0 }

																// Tháng 6
																$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(5);
																$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(5);

																$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
																	.then(resp => {
																		$scope.dataS6 = resp.data;
																		if ($scope.dataS6 == "") { $scope.dataS6 = 0 }

																		// Tháng 7
																		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(6);
																		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(6);

																		$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
																			.then(resp => {
																				$scope.dataS7 = resp.data;
																				if ($scope.dataS7 == "") { $scope.dataS7 = 0 }

																				// Tháng 8
																				$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(7);
																				$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(7);

																				$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
																					.then(resp => {
																						$scope.dataS8 = resp.data;
																						if ($scope.dataS8 == "") { $scope.dataS8 = 0 }

																						// Tháng 9
																						$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(8);
																						$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(8);

																						$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
																							.then(resp => {
																								$scope.dataS9 = resp.data;
																								if ($scope.dataS9 == "") { $scope.dataS9 = 0 }

																								// Tháng 10
																								$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(9);
																								$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(9);

																								$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
																									.then(resp => {
																										$scope.dataS10 = resp.data;
																										if ($scope.dataS10 == "") { $scope.dataS10 = 0 }

																										// Tháng 11
																										$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(10);
																										$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(30); $scope.dateEnd.setMonth(10);

																										$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
																											.then(resp => {
																												$scope.dataS11 = resp.data;
																												if ($scope.dataS11 == "") { $scope.dataS11 = 0 }

																												// Tháng 12
																												$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setDate(1); $scope.dateStart.setMonth(11);
																												$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setDate(31); $scope.dateEnd.setMonth(11);

																												$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
																													.then(resp => {
																														$scope.dataS12 = resp.data;
																														if ($scope.dataS12 == "") { $scope.dataS12 = 0 }

																														var ctx2 = $("#salse-revenue").get(0).getContext("2d");
																														var myChart2 = new Chart(ctx2, {
																															type: "bar",
																															data: {
																																labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
																																datasets: [{
																																	label: "Doanh thu (VND)",
																																	data: [
																																		$scope.dataS1, $scope.dataS2, $scope.dataS3, $scope.dataS4, $scope.dataS5, $scope.dataS6
																																		, $scope.dataS7, $scope.dataS8, $scope.dataS9, $scope.dataS10, $scope.dataS11, $scope.dataS12
																																	],
																																	backgroundColor: "rgba(0, 84, 230, 90)"
																																}]
																															},
																															options: {
																																responsive: true,
																																scales: {
																																	x: {
																																		grid: {
																																			drawOnChartArea: false
																																		}
																																	},
																																	y: {
																																		beginAtZero: true
																																	}
																																}
																															}
																														});
																														// Tháng 12
																													})
																													.catch(error => {
																														console.log('error: ', error)
																													})
																												// Tháng 11
																											})
																											.catch(error => {
																												console.log('error: ', error)
																											})
																										// Tháng 10
																									})
																									.catch(error => {
																										console.log('error: ', error)
																									})
																								// Tháng 9
																							})
																							.catch(error => {
																								console.log('error: ', error)
																							})
																						// Tháng 8
																					})
																					.catch(error => {
																						console.log('error: ', error)
																					})
																				// Tháng 7
																			})
																			.catch(error => {
																				console.log('error: ', error)
																			})
																		// Tháng 6
																	})
																	.catch(error => {
																		console.log('error: ', error)
																	})
																// Tháng 5
															})
															.catch(error => {
																console.log('error: ', error)
															})
														// Tháng 4
													})
													.catch(error => {
														console.log('error: ', error)
													})
												// Tháng 3
											})
											.catch(error => {
												console.log('error: ', error)
											})
										// Tháng 2
									})
									.catch(error => {
										console.log('error: ', error)
									})
								// Tháng 1
							})
							.catch(error => {
								console.log('error: ', error)
							})
					})
			})
	}; $scope.loadDataSale();

	// Hóa đơn || Doanh thu trong ngày
	$scope.getOrderInDate = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/getStoreToken").then(resp => {
						const storeid = resp.data;

						const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
						const end = 24 * 60 * 60 * 1000 - 1;

						$scope.dateStart = new Date();
						$scope.dateEnd = new Date();

						$scope.dateStart.setTime(exampleDate.getTime());
						$scope.dateEnd.setTime(exampleDate.getTime() + end);

						$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
							.then(resp => {
								$scope.orderInDate = resp.data;
							})
							.catch(error => {
								console.log('error: ', error)
							})
					})
			})
	}

	$scope.getSaleOrderInDate = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/getStoreToken").then(resp => {
						const storeid = resp.data;

						const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
						const end = 24 * 60 * 60 * 1000 - 1;

						$scope.dateStart = new Date();
						$scope.dateEnd = new Date();

						$scope.dateStart.setTime(exampleDate.getTime());
						$scope.dateEnd.setTime(exampleDate.getTime() + end);

						$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
							.then(resp => {
								$scope.saleorderInDate = resp.data;
							})
							.catch(error => {
								console.log('error: ', error)
							})
					})
			})
	}

	$scope.getSaleOrderInDate();
	$scope.getOrderInDate();

	// Hóa đơn || Doanh thu trong tháng
	$scope.getOrderInMonth = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/getStoreToken").then(resp => {
						const storeid = resp.data;

						const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
						const end = 24 * 60 * 60 * 1000 - 1;

						$scope.dateStart = new Date();
						$scope.dateEnd = new Date();
						$scope.month = new Date().getMonth() + 1;

						$scope.dateStart.setTime(exampleDate.getTime());
						$scope.dateStart.setDate(1);
						$scope.dateEnd.setTime(exampleDate.getTime() + end);
						$scope.dateEnd.setDate(30);

						$http.get("/api/count/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
							.then(resp => {
								$scope.orderInMonth = resp.data;
							})
							.catch(error => {
								console.log('error: ', error)
							})
					})
			})
	}

	$scope.getSaleOrderInMonth = function() {
		// Lấy userid
		$http.get("/api/get")
			.then(resp => {
				$scope.userid = resp.data;
				// Lấy storeid
				$http.get("/api/getStoreToken").then(resp => {
						const storeid = resp.data;

						const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
						const end = 24 * 60 * 60 * 1000 - 1;

						$scope.dateStart = new Date();
						$scope.dateEnd = new Date();
						$scope.month = new Date().getMonth() + 1;

						$scope.dateStart.setTime(exampleDate.getTime());
						$scope.dateStart.setDate(1);
						$scope.dateEnd.setTime(exampleDate.getTime() + end);
						$scope.dateEnd.setDate(30);

						$http.get("/api/sale/order/" + storeid + "/" + $scope.dateStart + "/" + $scope.dateEnd)
							.then(resp => {
								$scope.saleorderInMonth = resp.data;
							})
							.catch(error => {
								console.log('error: ', error)
							})
					})
			})
	}

	$scope.getSaleOrderInMonth();
	$scope.getOrderInMonth();

	//List top 5
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
		size: 5,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		}
	}

	$scope.report();
})
