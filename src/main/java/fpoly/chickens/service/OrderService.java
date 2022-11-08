package fpoly.chickens.service;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

import fpoly.chickens.entity.Order;

public interface OrderService {

	List<Order> getAllOrders(Integer storeid, Integer userid);

	void addOrder(JsonNode orderData);

	void cancelOrder(JsonNode orderData);

	List<Order> getOrderStore(Integer integer);

	List<Order> getOrdersbyStatus(Integer storeid, Integer userid, Integer status);

	Order findOrderById(Integer id);

	void updateOrder(JsonNode orderData);

}
