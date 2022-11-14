package fpoly.chickens.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.fasterxml.jackson.databind.JsonNode;

import fpoly.chickens.entity.Order;

public interface OrderService {

	List<Order> getAllOrders(Integer storeid, Integer userid);

	void addOrder(JsonNode orderData);

	Page<Order> getOrderStore(Integer storeid, Integer pageNumber,String field, Integer sort);

	List<Order> getOrdersbyStatus(Integer storeid, Integer userid, Integer status);

	Order findOrderById(Integer id);

	void updateOrder(JsonNode orderData);

	Page<Order> getOrderStoreByStatus(Integer storeid, Integer status, Integer pageNumber, String field, Integer checksort);

	Page<Order> getOrderStoreByKeyword(Integer storeid, String keyword);



}
