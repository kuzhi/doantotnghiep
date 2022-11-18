package fpoly.chickens.Implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.OrderDAO;
import fpoly.chickens.dao.OrderDetailDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.Order;
import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.Store;
import fpoly.chickens.service.OrderDetailService;


@SessionScope
@Service
public class OrderDetailImplement implements OrderDetailService{
	
	@Autowired
	OrderDAO orderDAO;

	@Autowired
	StoreDAO storeDao;

	@Autowired
	OrderDetailDAO orderDetailDAO;
	
	@Override
	public List<OrderDetail> findByOrder(Integer orderid) {
		Order order = orderDAO.findById(orderid).get();
		return orderDetailDAO.findOrderDetailByOrder(order);
	}

	@Override
	public ArrayList<String> getIdforReport(Integer storeid, Date dateStar, Date dateEnd) {
		// TODO Auto-generated method stub
		Store store = storeDao.findById(storeid).get();
		return orderDetailDAO.getIdforReport(store, dateStar, dateEnd);
	}

	@Override
	public Integer getTotalReport(Integer storeid, Date dateStar, Date dateEnd, Integer productId) {
		// TODO Auto-generated method stub
		Store store = storeDao.findById(storeid).get();
		return orderDetailDAO.getTotalReport(store, dateStar, dateEnd, productId);
	}

}
