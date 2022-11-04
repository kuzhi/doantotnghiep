package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.OrderDetailDAO;
import fpoly.chickens.entity.ReportOverViewApp;
import fpoly.chickens.service.ReportOverViewAppService;

@SessionScope
@Service
public class ReportOverViewAppImplement implements ReportOverViewAppService {
	@Autowired
	OrderDetailDAO orderDetailDAO;

	@Override
	public List<ReportOverViewApp> showTop5Product() {
		// TODO Auto-generated method stub
		return orderDetailDAO.top5Product();
	}
}
