package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.OrderDAO;
import fpoly.chickens.dao.OrderDetailDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.Order;
import fpoly.chickens.entity.OrderDetail;
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


}
