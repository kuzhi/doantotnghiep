package fpoly.chickens.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.entity.ReportOverViewApp;
import fpoly.chickens.service.ReportOverViewAppService;

@CrossOrigin("*")
@RestController
public class ReportOverViewAppAPI {
	@Autowired
	ReportOverViewAppService reportOverView;
	
	@RequestMapping("/api/report-overview-app")
	public List<ReportOverViewApp> getReportOverView() {
		return reportOverView.showTop5Product();
	}
}
