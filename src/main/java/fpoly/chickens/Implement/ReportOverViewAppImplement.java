package fpoly.chickens.Implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.OrderDetailDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.ReportOverViewApp;
import fpoly.chickens.entity.ReportProductApp;
import fpoly.chickens.entity.Store;
import fpoly.chickens.service.ReportOverViewAppService;

@SessionScope
@Service
public class ReportOverViewAppImplement implements ReportOverViewAppService {
	@Autowired
	OrderDetailDAO orderDetailDAO;
	@Autowired StoreDAO storeDAO;

	@Override
	public List<ReportOverViewApp> showTop5Product(Integer status) {
		// TODO Auto-generated method stub
		return orderDetailDAO.top5Product(status);
	}

	@Override
	public List<ReportProductApp> showTop10Product(Date dateStart, Date dateEnd, Integer storeid, Integer status) {
		Store store = storeDAO.findById(storeid).get();
		// TODO Auto-generated method stub
		return orderDetailDAO.top10Product(dateStart, dateEnd, store, status);
	}}
