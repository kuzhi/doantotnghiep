package fpoly.chickens.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;

import com.fasterxml.jackson.databind.JsonNode;

import fpoly.chickens.entity.Order;

public interface OrderService {

	List<Order> getAllOrders(Integer storeid, Integer userid);

	void addOrder(JsonNode orderData);

	void cancelOrder(JsonNode orderData);

	Page<Order> getOrderStore(Integer storeid, Integer pageNumber);

	List<Order> getOrdersbyStatus(Integer storeid, Integer userid, Integer status);

	Order findOrderById(Integer id);

	void updateOrder(JsonNode orderData);

	Page<Order> getOrderStoreByStatus(Integer storeid, Integer status, Integer pageNumber);

	Order getOrderbyId(Integer id);
	
	Integer getOrderInDate(Integer storeid, Date date);
}
