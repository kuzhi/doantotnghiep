app.controller("report-sale-ctrl", function($scope, $http, $location) {
	$scope.titleBreadcrumb = 'Báo cáo';
	$scope.titleBread = 'Doanh thu bán hàng';
	$scope.storeid = 2;

	// Biểu đồ bán hàng
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

	function getAllDaysInMonth(year, month) {
		const date = new Date(year, month, 1);
		const dates = [];

		while (date.getMonth() === month) {
			dates.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}

		return dates;
	}

	$scope.allDays = [];
	const now = new Date();
	for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth()).length+1; i++) {
		$scope.allDays.push(i)
	}
	
	$scope.getReportByMonth = function() {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		
		// ======= Tháng 1
		if ($scope.list == 1) {
			newMonth = 0;
			$scope.allDays = [];
			month = now.getMonth();
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(0))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 2
		else if ($scope.list == 2) {
			newMonth = 1;
			$scope.allDays = [];
			month = now.getMonth();
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(1))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 3
		else if ($scope.list == 3) {
			month = now.getMonth();
			newMonth = 2;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(2))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 4
		else if ($scope.list == 4) {
			month = now.getMonth();
			newMonth = 3;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(3))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 5
		if ($scope.list == 5) {
			month = now.getMonth();
			newMonth = 4;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(4))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 6
		else if ($scope.list == 6) {
			month = now.getMonth();
			newMonth = 5;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(5))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 7
		else if ($scope.list == 7) {
			month = now.getMonth();
			newMonth = 6;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(6))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 8
		else if ($scope.list == 8) {
			month = now.getMonth();
			newMonth = 7;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(7))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 9
		if ($scope.list == 9) {
			month = now.getMonth();
			newMonth = 8;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(8))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 10
		else if ($scope.list == 10) {
			month = now.getMonth();
			newMonth = 9;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(9))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 11
		else if ($scope.list == 11) {
			month = now.getMonth();
			newMonth = 10;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(10))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
		// ======= Tháng 12
		else if ($scope.list == 12) {
			month = now.getMonth();
			newMonth = 11;
			$scope.allDays = [];
			// 👇️ all days of the current month
			for(var i=1; i<getAllDaysInMonth(now.getFullYear(), now.getMonth(now.setMonth(11))).length+1; i++) {
				$scope.allDays.push(i)
			}
			getData($scope.storeid, now.getFullYear(), newMonth);
		}
	}

	function getData(storeid, year, month) {
		const exampleDate = new Date(new Date().setHours(0, 0, 0, 0));
		const end =  24 * 60 * 60 * 1000 - 1;
		$scope.dateStart = new Date(year, month);
		$scope.dateEnd = new Date(year, month);
		
		// Ngày 1
		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); $scope.dateStart.setDate($scope.allDays[0]);
		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); $scope.dateEnd.setDate($scope.allDays[0]);
		
		$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
		.then(resp => {
			$scope.data1 = resp.data;
			if($scope.data1 == "") {$scope.data1 = 0}

			// Ngày 2
			$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); $scope.dateStart.setDate($scope.allDays[1]);
			$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); $scope.dateEnd.setDate($scope.allDays[1]);
			
			$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
			.then(resp => {
				$scope.data2 = resp.data;
				if($scope.data2 == "") {$scope.data2 = 0}
	
				// Ngày 3
				$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); $scope.dateStart.setDate($scope.allDays[2]);
				$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); $scope.dateEnd.setDate($scope.allDays[2]);
				
				$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
				.then(resp => {
					$scope.data3 = resp.data;
					if($scope.data3 == "") {$scope.data3 = 0}

					// Ngày 4
					$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
					$scope.dateStart.setDate($scope.allDays[3]);
					$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
					$scope.dateEnd.setDate($scope.allDays[3]);
					
					$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
					.then(resp => {
						$scope.data4 = resp.data;
						if($scope.data4 == "") {$scope.data4 = 0}

						// Ngày 5
						$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
						$scope.dateStart.setDate($scope.allDays[4]);
						$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
						$scope.dateEnd.setDate($scope.allDays[4]);
						
						$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
						.then(resp => {
							$scope.data5 = resp.data;
							if($scope.data5 == "") {$scope.data5 = 0}

							// Ngày 6
							$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
							$scope.dateStart.setDate($scope.allDays[5]);
							$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
							$scope.dateEnd.setDate($scope.allDays[5]);
							
							$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
							.then(resp => {
								$scope.data6 = resp.data;
								if($scope.data6 == "") {$scope.data6 = 0}

								// Ngày 7
								$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
								$scope.dateStart.setDate($scope.allDays[6]);
								$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
								$scope.dateEnd.setDate($scope.allDays[6]);
								
								$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
								.then(resp => {
									$scope.data7 = resp.data;
									if($scope.data7 == "") {$scope.data7 = 0}

									// Ngày 8
									$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
									$scope.dateStart.setDate($scope.allDays[7]);
									$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
									$scope.dateEnd.setDate($scope.allDays[7]);
									
									$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
									.then(resp => {
										$scope.data8 = resp.data;
										if($scope.data8 == "") {$scope.data8 = 0}

										// Ngày 9
										$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
										$scope.dateStart.setDate($scope.allDays[8]);
										$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
										$scope.dateEnd.setDate($scope.allDays[8]);
										
										$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
										.then(resp => {
											$scope.data9 = resp.data;
											if($scope.data9 == "") {$scope.data9 = 0}

											// Ngày 10
											$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
											$scope.dateStart.setDate($scope.allDays[9]);
											$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
											$scope.dateEnd.setDate($scope.allDays[9]);
											
											$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
											.then(resp => {
												$scope.data10 = resp.data;
												if($scope.data10 == "") {$scope.data10 = 0}

												// Ngày 11
												$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
												$scope.dateStart.setDate($scope.allDays[10]);
												$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
												$scope.dateEnd.setDate($scope.allDays[10]);
												
												$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
												.then(resp => {
													$scope.data11 = resp.data;
													if($scope.data11 == "") {$scope.data11 = 0}

													// Ngày 12
													$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
													$scope.dateStart.setDate($scope.allDays[11]);
													$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
													$scope.dateEnd.setDate($scope.allDays[11]);
													
													$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
													.then(resp => {
														$scope.data12 = resp.data;
														if($scope.data12 == "") {$scope.data12 = 0}

														// Ngày 13
														$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
														$scope.dateStart.setDate($scope.allDays[12]);
														$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
														$scope.dateEnd.setDate($scope.allDays[12]);
														
														$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
														.then(resp => {
															$scope.data13 = resp.data;
															if($scope.data13 == "") {$scope.data13 = 0}

															// Ngày 14
															$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
															$scope.dateStart.setDate($scope.allDays[13]);
															$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
															$scope.dateEnd.setDate($scope.allDays[13]);
															
															$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
															.then(resp => {
																$scope.data14 = resp.data;
																if($scope.data14 == "") {$scope.data14 = 0}

																// Ngày 15
																$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																$scope.dateStart.setDate($scope.allDays[14]);
																$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																$scope.dateEnd.setDate($scope.allDays[14]);
																
																$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																.then(resp => {
																	$scope.data15 = resp.data;
																	if($scope.data15 == "") {$scope.data15 = 0}

																	// Ngày 16
																	$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																	$scope.dateStart.setDate($scope.allDays[15]);
																	$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																	$scope.dateEnd.setDate($scope.allDays[15]);
																	
																	$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																	.then(resp => {
																		$scope.data16 = resp.data;
																		if($scope.data16 == "") {$scope.data16 = 0}

																		// Ngày 17
																		$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																		$scope.dateStart.setDate($scope.allDays[16]);
																		$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																		$scope.dateEnd.setDate($scope.allDays[16]);
																		
																		$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																		.then(resp => {
																			$scope.data17 = resp.data;
																			if($scope.data17 == "") {$scope.data17 = 0}

																			// Ngày 18
																			$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																			$scope.dateStart.setDate($scope.allDays[17]);
																			$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																			$scope.dateEnd.setDate($scope.allDays[17]);
																			
																			$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																			.then(resp => {
																				$scope.data18 = resp.data;
																				if($scope.data18 == "") {$scope.data18 = 0}

																				// Ngày 19
																				$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																				$scope.dateStart.setDate($scope.allDays[18]);
																				$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																				$scope.dateEnd.setDate($scope.allDays[18]);
																				
																				$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																				.then(resp => {
																					$scope.data19 = resp.data;
																					if($scope.data19 == "") {$scope.data19 = 0}

																					// Ngày 20
																					$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																					$scope.dateStart.setDate($scope.allDays[19]);
																					$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																					$scope.dateEnd.setDate($scope.allDays[19]);
																					
																					$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																					.then(resp => {
																						$scope.data20 = resp.data;
																						if($scope.data20 == "") {$scope.data20 = 0}

																						// Ngày 21
																						$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																						$scope.dateStart.setDate($scope.allDays[20]);
																						$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																						$scope.dateEnd.setDate($scope.allDays[20]);
																						
																						$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																						.then(resp => {
																							$scope.data21 = resp.data;
																							if($scope.data21 == "") {$scope.data21 = 0}

																							// Ngày 22
																							$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																							$scope.dateStart.setDate($scope.allDays[21]);
																							$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																							$scope.dateEnd.setDate($scope.allDays[21]);
																							
																							$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																							.then(resp => {
																								$scope.data22 = resp.data;
																								if($scope.data22 == "") {$scope.data22 = 0}

																								// Ngày 23
																								$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																								$scope.dateStart.setDate($scope.allDays[22]);
																								$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																								$scope.dateEnd.setDate($scope.allDays[22]);
																								
																								$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																								.then(resp => {
																									$scope.data23 = resp.data;
																									if($scope.data23 == "") {$scope.data23 = 0}

																									// Ngày 24
																									$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																									$scope.dateStart.setDate($scope.allDays[23]);
																									$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																									$scope.dateEnd.setDate($scope.allDays[23]);
																									
																									$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																									.then(resp => {
																										$scope.data24 = resp.data;
																										if($scope.data24 == "") {$scope.data24 = 0}

																										// Ngày 25
																										$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																										$scope.dateStart.setDate($scope.allDays[24]);
																										$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																										$scope.dateEnd.setDate($scope.allDays[24]);
																										
																										$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																										.then(resp => {
																											$scope.data25 = resp.data;
																											if($scope.data25 == "") {$scope.data25 = 0}

																											// Ngày 26
																											$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																											$scope.dateStart.setDate($scope.allDays[25]);
																											$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																											$scope.dateEnd.setDate($scope.allDays[25]);
																											
																											$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																											.then(resp => {
																												$scope.data26 = resp.data;
																												if($scope.data26 == "") {$scope.data26 = 0}

																												// Ngày 27
																												$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																												$scope.dateStart.setDate($scope.allDays[26]);
																												$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																												$scope.dateEnd.setDate($scope.allDays[26]);
																												
																												$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																												.then(resp => {
																													$scope.data27 = resp.data;
																													if($scope.data27 == "") {$scope.data27 = 0}

																													// Ngày 28
																													$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																													$scope.dateStart.setDate($scope.allDays[27]);
																													$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																													$scope.dateEnd.setDate($scope.allDays[27]);
																													
																													$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																													.then(resp => {
																														$scope.data28 = resp.data;
																														if($scope.data28 == "") {$scope.data28 = 0}

																														if(month!=1) {
																															// Ngày 29
																															$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																															$scope.dateStart.setDate($scope.allDays[28]);
																															$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																															$scope.dateEnd.setDate($scope.allDays[28]);
																															
																															$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																															.then(resp => {
																																$scope.data29 = resp.data;
																																if($scope.data29 == "") {$scope.data29 = 0}
	
																																// Ngày 30
																																$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																																$scope.dateStart.setDate($scope.allDays[29]);
																																$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																																$scope.dateEnd.setDate($scope.allDays[29]);
																																
																																$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																																.then(resp => {
																																	$scope.data30 = resp.data;
																																	if($scope.data30 == "") {$scope.data30 = 0}
	
																																	// Ngày 31
																																	$scope.dateStart.setTime(exampleDate.getTime()); $scope.dateStart.setMonth(month); 
																																	$scope.dateStart.setDate($scope.allDays[0]);
																																	$scope.dateEnd.setTime(exampleDate.getTime() + end); $scope.dateEnd.setMonth(month); 
																																	$scope.dateEnd.setDate($scope.allDays[0]);
																																	
																																	$http.get("/api/sale/order/" + storeid + "/"  + $scope.dateStart + "/" +  $scope.dateEnd)
																																	.then(resp => {
																																		$scope.data31 = resp.data;
																																		if($scope.data31 == "") {$scope.data31 = 0}
																																		
																																		if(window.myChart2 instanceof Chart)
																																		{
																																		    window.myChart2.destroy();
																																		}
																																		month += 1;
																																		
																																		var ctx2 = $("#saleChart").get(0).getContext("2d");
																																		window.myChart2 = new Chart(ctx2, {
																																			type: "bar",
																																			data: {
																																				labels: $scope.allDays,
																																				datasets: [
																																					{
																																						label: "Doanh thu tháng "+month,
																																						data: [$scope.data1, $scope.data2, $scope.data3, $scope.data4, $scope.data5, $scope.data6, $scope.data7, $scope.data8, $scope.data9, $scope.data10
																																				, $scope.data11, $scope.data12, $scope.data13, $scope.data14, $scope.data15, $scope.data16, $scope.data17, $scope.data18, $scope.data19, $scope.data20
																																				, $scope.data21, $scope.data22, $scope.data23, $scope.data24, $scope.data25, $scope.data26, $scope.data27, $scope.data28, $scope.data29, $scope.data30, $scope.data31
	],
																																						backgroundColor: "rgba(0, 84, 230, 90)"
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
																																		// Ngày 31
																																	})
																																	.catch(error => {
																																		console.log('error: ', error)
																																	})
																																	// Ngày 30
																																})
																																.catch(error => {
																																	console.log('error: ', error)
																																})
																																// Ngày 29
																															})
																															.catch(error => {
																																console.log('error: ', error)
																															})
																														}
																														else {
																															if(window.myChart2 instanceof Chart)
																															{
																															    window.myChart2.destroy();
																															}
																															month +=1;
																															
																															var ctx2 = $("#saleChart").get(0).getContext("2d");
																															window.myChart2 = new Chart(ctx2, {
																																type: "bar",
																																	data: {
																																		labels: $scope.allDays,
																																		datasets: [
																																			{
																																				label: "Doanh thu tháng "+month,
																																				data: [$scope.data1, $scope.data2, $scope.data3, $scope.data4, $scope.data5, $scope.data6, $scope.data7, $scope.data8, $scope.data9, $scope.data10
																																					, $scope.data11, $scope.data12, $scope.data13, $scope.data14, $scope.data15, $scope.data16, $scope.data17, $scope.data18, $scope.data19, $scope.data20
																																					, $scope.data21, $scope.data22, $scope.data23, $scope.data24, $scope.data25, $scope.data26, $scope.data27, $scope.data28],
																																				backgroundColor: "rgba(0, 84, 230, 90)"
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
																														}
																														
																														// Ngày 28
																													})
																													.catch(error => {
																														console.log('error: ', error)
																													})
																													// Ngày 27
																												})
																												.catch(error => {
																													console.log('error: ', error)
																												})
																												// Ngày 26
																											})
																											.catch(error => {
																												console.log('error: ', error)
																											})
																											// Ngày 25
																										})
																										.catch(error => {
																											console.log('error: ', error)
																										})
																										// Ngày 24
																									})
																									.catch(error => {
																										console.log('error: ', error)
																									})
																									// Ngày 23
																								})
																								.catch(error => {
																									console.log('error: ', error)
																								})
																								// Ngày 22
																							})
																							.catch(error => {
																								console.log('error: ', error)
																							})
																							// Ngày 21
																						})
																						.catch(error => {
																							console.log('error: ', error)
																						})
																						// Ngày 20
																					})
																					.catch(error => {
																						console.log('error: ', error)
																					})
																					// Ngày 19
																				})
																				.catch(error => {
																					console.log('error: ', error)
																				})
																				// Ngày 18
																			})
																			.catch(error => {
																				console.log('error: ', error)
																			})
																			// Ngày 17
																		})
																		.catch(error => {
																			console.log('error: ', error)
																		})
																		// Ngày 16
																	})
																	.catch(error => {
																		console.log('error: ', error)
																	})
																	// Ngày 15
																})
																.catch(error => {
																	console.log('error: ', error)
																})
																// Ngày 14
															})
															.catch(error => {
																console.log('error: ', error)
															})
															// Ngày 13
														})
														.catch(error => {
															console.log('error: ', error)
														})
														// Ngày 12
													})
													.catch(error => {
														console.log('error: ', error)
													})
													// Ngày 11
												})
												.catch(error => {
													console.log('error: ', error)
												})
												// Ngày 10
											})
											.catch(error => {
												console.log('error: ', error)
											})	
											// Ngày 9
										})
										.catch(error => {
											console.log('error: ', error)
										})		
										// Ngày 8
									})
									.catch(error => {
										console.log('error: ', error)
									})
									// Ngày 7
								})
								.catch(error => {
									console.log('error: ', error)
								})
								// Ngày 6
							})
							.catch(error => {
								console.log('error: ', error)
							})
							// Ngày 5
						})
						.catch(error => {
							console.log('error: ', error)
						})
						// Ngày 4
					})
					.catch(error => {
						console.log('error: ', error)
					})
					// Ngày 3
				})
				.catch(error => {
					console.log('error: ', error)
				})
				// Ngày 2
			})
			.catch(error => {
				console.log('error: ', error)
			})
			// Ngày 1
		})
		.catch(error => {
			console.log('error: ', error)
		})
	}; getData($scope.storeid, now.getFullYear(), now.getMonth());
})

