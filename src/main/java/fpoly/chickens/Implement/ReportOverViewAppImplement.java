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
	public List<ReportOverViewApp> showTop5Product() {
		// TODO Auto-generated method stub
		return orderDetailDAO.top5Product();
	}

	@Override
	public ArrayList<String> loadListProductByDate(Integer storeid, Date dateStar, Date dateEnd) {
		// TODO Auto-generated method stub
		Store store = storeDAO.findById(storeid).get();
		
		return orderDetailDAO.loadOrderDetailByDate(store, dateStar, dateEnd);
	}

	@Override
	public List<ReportProductApp> loadDataListProductByDate(Integer storeid, Date dateStar, Date dateEnd) {
		// TODO Auto-generated method stub
		Store store = storeDAO.findById(storeid).get();
		
		return orderDetailDAO.loadDataOrderDetailByDate(store, dateStar, dateEnd);
	}
}
