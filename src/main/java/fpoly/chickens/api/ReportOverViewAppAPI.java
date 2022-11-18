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
	
	@RequestMapping("/api/report-overview-app")
	public List<ReportOverViewApp> getReportOverView() {
		return reportOverView.showTop5Product();
	}

	@RequestMapping("/api/report-product-app/{storeid}/{dateStart}/{dateEnd}")
	public ResponseEntity<ArrayList<String>> getReportProduct(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("dateStart") Optional<Date> dateStart, @PathVariable("dateEnd") Optional<Date> dateEnd) {
		
		return ResponseEntity.ok(reportOverView.loadListProductByDate(storeid.get(), dateStart.get(), dateEnd.get()));
	}

	@RequestMapping("/api/report-product-app/data/{storeid}/{dateStart}/{dateEnd}")
	public ResponseEntity<List<ReportProductApp>> getReportProductData(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("dateStart") Optional<Date> dateStart, @PathVariable("dateEnd") Optional<Date> dateEnd) {
		
		return ResponseEntity.ok(reportOverView.loadDataListProductByDate(storeid.get(), dateStart.get(), dateEnd.get()));
	}
	
	@RequestMapping("/api/report-product-app/data/product-id/{storeid}/{dateStart}/{dateEnd}")
	public ResponseEntity<ArrayList<String>> getIdReport(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("dateStart") Optional<Date> dateStart, @PathVariable("dateEnd") Optional<Date> dateEnd) {
		
		return ResponseEntity.ok(orderDetailService.getIdforReport(storeid.get(), dateStart.get(), dateEnd.get()));
	}

	@RequestMapping("/api/report-product-app/data/product-id/data/{storeid}/{dateStart}/{dateEnd}/{productId}")
	public ResponseEntity<Integer> getDataReport(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("dateStart") Optional<Date> dateStart, @PathVariable("dateEnd") Optional<Date> dateEnd,
			@PathVariable("productId") Optional<Integer> productId) {
		
		return ResponseEntity.ok(orderDetailService.getTotalReport(storeid.get(), dateStart.get(), dateEnd.get(), productId.get()));
	}
}
