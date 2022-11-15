package fpoly.chickens.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;

import com.fasterxml.jackson.databind.JsonNode;

import fpoly.chickens.entity.Order;
import fpoly.chickens.entity.Store;

public interface OrderService {

	List<Order> getAllOrders(Integer storeid, Integer userid);

	void addOrder(JsonNode orderData);

	Page<Order> getOrderStore(Integer storeid, Integer pageNumber,String field, Integer sort);

	List<Order> getOrdersbyStatus(Integer storeid, Integer userid, Integer status);

	Order findOrderById(Integer id);

	void updateOrder(JsonNode orderData);

	Page<Order> getOrderStoreByStatus(Integer storeid, Integer status, Integer pageNumber, String field, Integer checksort);

	Page<Order> getOrderStoreByKeyword(Integer storeid, String keyword);

	Order getOrderbyId(Integer id);
	
	// Count order
	Integer getOrderInDate(Integer storeid, Date dateStar, Date dateEnd);
	Integer getSaleOrderInDate(Integer storeid, Date dateStar, Date dateEnd);
	List<Order> countOrderInDateWithStatus(Integer storeid, Date dateStar, Date dateEnd, Integer Status);
}
