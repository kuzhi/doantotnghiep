package fpoly.chickens.Implement;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.OrderPackDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.OrderPack;
import fpoly.chickens.entity.Pack;
import fpoly.chickens.entity.Store;
import fpoly.chickens.service.OrderPackService;

@SessionScope
@Service
public class OrderPackImplement implements OrderPackService {

	@Autowired
	OrderPackDAO orderPackDao;

	@Autowired
	StoreDAO storeDao;

	@Override
	public void addOrderPack(OrderPack orderPackData) {
		orderPackData.setStatus(1);
		orderPackDao.saveAndFlush(orderPackData);

	}

	@Override
	public void updateOrderPack(OrderPack orderPackData) {
		if (orderPackData.getStatus() == 2) {
			Store store = orderPackData.getStore();
			Pack pack = orderPackData.getPack();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(store.getEnddate());
			calendar.add(Calendar.DATE, pack.getDate());
			store.setEnddate(calendar.getTime());
			storeDao.saveAndFlush(store);
		}
		orderPackDao.saveAndFlush(orderPackData);

	}

	@Override
	public Page<OrderPack> getOrderPack(Integer page) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<OrderPack> getOrderPackByStatus(Integer status, Integer page) {
		// TODO Auto-generated method stub
		return null;
	}

}
