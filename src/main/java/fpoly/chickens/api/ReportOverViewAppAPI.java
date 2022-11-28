package fpoly.chickens.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.ReportOverViewApp;
import fpoly.chickens.entity.ReportProductApp;
import fpoly.chickens.service.OrderDetailService;
import fpoly.chickens.service.ReportOverViewAppService;

@CrossOrigin("*")
@RestController
public class ReportOverViewAppAPI {
	@Autowired
	ReportOverViewAppService reportOverView;
	@Autowired
	OrderDetailService orderDetailService;
	
	@RequestMapping("/api/report-overview-app/{storeid}")
	public List<ReportOverViewApp> getReportOverView(@PathVariable("storeid") Optional<Integer> storeid) {
		Integer status = 3;
		
		return reportOverView.showTop5Product(status, storeid.get());
	}

	@RequestMapping("/api/report-product-app/{storeid}/{dateStart}/{dateEnd}")
	public ResponseEntity<List<ReportProductApp>> getReportProduct1(
			@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("dateStart") Optional<Date> dateStart,
			@PathVariable("dateEnd") Optional<Date> dateEnd) {
		Integer status = 3;
		
		return ResponseEntity.ok(reportOverView.showTop10Product(dateStart.get(), dateEnd.get(), storeid.get(), status));
	}
}
