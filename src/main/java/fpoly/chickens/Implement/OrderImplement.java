package fpoly.chickens.Implement;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import fpoly.chickens.dao.OrderDAO;
import fpoly.chickens.dao.OrderDetailDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.dao.UserDAO;
import fpoly.chickens.entity.Order;
import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;
import fpoly.chickens.service.OrderService;

@SessionScope
@Service
public class OrderImplement implements OrderService {

	@Autowired
	OrderDAO orderDao;

	@Autowired
	StoreDAO storeDao;

	@Autowired
	OrderDetailDAO orderDetailDao;

	@Autowired
	UserDAO userDao;

	@Override
	public List<Order> getAllOrders(Integer storeid, Integer userid) {
		Store store = storeDao.findById(storeid).get();
		User user = userDao.findById(userid).get();
		return orderDao.getOrder(store, user);
	}

	@Override
	public void addOrder(JsonNode orderData) {
		ObjectMapper mapper = new ObjectMapper();
		Order order = mapper.convertValue(orderData, Order.class);
		Integer stt = orderDao.countOrderInStore(order.getStore()) + 1;
		order.setOrdercode("DH" + stt);
		TypeReference<List<OrderDetail>> type = new TypeReference<List<OrderDetail>>() {
		};

		List<OrderDetail> list = mapper.convertValue(orderData.get("orderDetail"), type).stream()
				.peek(d -> d.setOrder(order)).collect(Collectors.toList());
		for (OrderDetail orderDetail : list) {
			orderDetail.setTotalMoney(orderDetail.getProduct().getPrice() * orderDetail.getAmount());
		}
		order.setTotalMoney(list.stream().mapToInt(item -> item.getProduct().getPrice() * item.getAmount()).sum());
		orderDao.saveAndFlush(order);
		orderDetailDao.saveAllAndFlush(list);
	}

	@Override
	public void updateOrder(JsonNode orderData) {
		ObjectMapper mapper = new ObjectMapper();
		Order order = mapper.convertValue(orderData, Order.class);
		Order orderUpdate = orderDao.findById(order.getId()).get();
		orderUpdate.setStatus(order.getStatus());
		orderDao.saveAndFlush(orderUpdate);

	}

	@Override
	public void cancelOrder(JsonNode orderData) {
		ObjectMapper mapper = new ObjectMapper();
		Order order = mapper.convertValue(orderData, Order.class);
		order.setStatus(3);
		orderDao.saveAndFlush(order);
	}

	@Override
	public Page<Order> getOrderStore(Integer storeid, Integer pageNumber) {
		Store store = storeDao.findById(storeid).get();
		if (pageNumber < 0) {
			pageNumber = 0;
		}
		Pageable pageable = PageRequest.of(pageNumber, 1);
		Page<Order> page = orderDao.findAllByStore(store, pageable);
		if (pageNumber >= page.getTotalPages() - 1) {
			pageNumber = page.getTotalPages() - 1;
			pageable = PageRequest.of(pageNumber, 1);
			page = orderDao.findAllByStore(store, pageable);
		}
		return page;
	}

	@Override
	public List<Order> getOrdersbyStatus(Integer storeid, Integer userid, Integer status) {
		Store store = storeDao.findById(storeid).get();
		User user = userDao.findById(userid).get();
		List<Order> list = orderDao.getOrdersStatus(store, user, status);
		return list;
	}

	@Override
	public Order findOrderById(Integer id) {
		Order order = orderDao.findById(id).get();
		return order;
	}

	@Override
	public Page<Order> getOrderStoreByStatus(Integer storeid, Integer status, Integer pageNumber) {
		Store store = storeDao.findById(storeid).get();
		if (pageNumber < 0) {
			pageNumber = 0;
		}
		Pageable pageable = PageRequest.of(pageNumber, 1);
		Page<Order> page = orderDao.findAllByStoreAndStatus(store, status, pageable);
		if (pageNumber >= page.getTotalPages() - 1) {
			pageNumber = page.getTotalPages() - 1;
			pageable = PageRequest.of(pageNumber, 1);
			page = orderDao.findAllByStoreAndStatus(store, status, pageable);
		}
		return page;
	}

	@Override
	public Order getOrderbyId(Integer id) {
		return orderDao.findById(id).get();
	}
}
