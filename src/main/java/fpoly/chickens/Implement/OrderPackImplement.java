package fpoly.chickens.Implement;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.OrderPackDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.OrderPack;
import fpoly.chickens.entity.Pack;
import fpoly.chickens.entity.ReportPack;
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
		Integer stt = orderPackDao.countOrderPack() + 1;
		orderPackData.setOrderpackcode("OP" + stt);
		orderPackData.setStatus(1);
		orderPackDao.saveAndFlush(orderPackData);

	}

	@Override
	public void updateOrderPack(OrderPack orderPackData) {
		OrderPack orderPack = orderPackDao.findById(orderPackData.getId()).get();
		if (orderPackData.getStatus() == 2) {
			Store store = orderPack.getStore();
			Pack pack = orderPack.getPack();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(store.getEnddate());
			calendar.add(Calendar.DATE, pack.getDate());
			store.setEnddate(calendar.getTime());
			storeDao.saveAndFlush(store);
		}
		orderPack.setStatus(orderPackData.getStatus());
		orderPack.setUpdate_at(new Date());
		orderPackDao.saveAndFlush(orderPack);
	}

	@Override
	public Page<OrderPack> getOrderPack(Integer pageNumber, String field, Integer checkSort) {
		if (pageNumber < 0) {
			pageNumber = 0;
		}
		Sort sort;
		if (checkSort % 2 == 0) {
			sort = Sort.by(Direction.DESC, field);
		} else {
			sort = Sort.by(Direction.ASC, field);
		}
		Pageable pageable = PageRequest.of(pageNumber, 1, sort);
		Page<OrderPack> page = orderPackDao.findAllOrderpack(pageable);
		if (pageNumber >= page.getTotalPages() - 1) {
			pageNumber = page.getTotalPages() - 1;
			pageable = PageRequest.of(pageNumber, 1);
			page = orderPackDao.findAll(pageable);
		}
		return page;
	}

	@Override
	public List<OrderPack> getOrderPackStore(Integer storeid) {
		Store store = storeDao.findById(storeid).get();
		return orderPackDao.findAllByStore(store);
	}

	@Override
	public OrderPack getOrderPackId(Integer id) {
		return orderPackDao.findById(id).get();
	}

	@Override
	public Page<OrderPack> getOrderPackKeyword(String keyword) {
		Pageable pageable = PageRequest.of(0, 10);
		Page<OrderPack> page = orderPackDao.findOrderpackbyKey(keyword, pageable);
		return page;
	}

	@Override
	public Integer countOrderPackByDate(Date dateStart, Date dateEnd, Integer status) {
		// TODO Auto-generated method stub
		return orderPackDao.countOrderPackByDate(dateStart, dateEnd, status);
	}

	@Override
	public List<ReportPack> getSale(Date dateStart, Date dateEnd, Integer status) {
		// TODO Auto-generated method stub
		return orderPackDao.getSale(dateStart, dateEnd, status);
	}

}
