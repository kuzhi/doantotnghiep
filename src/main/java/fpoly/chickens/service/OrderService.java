package fpoly.chickens.service;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

import fpoly.chickens.entity.Order;

public interface OrderService {

	List<Order> getOrder(Integer storeid, Integer userid);

	void addOrder(JsonNode orderData);

	void confirmOrder(JsonNode orderData);

	void cancelOrder(JsonNode orderData);

	List<Order> getOrderStore(Integer integer);

}
