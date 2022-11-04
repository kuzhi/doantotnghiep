package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Order;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;

public interface OrderDAO extends JpaRepository<Order, String> {

	@Query("SELECT o  FROM Order o where o.store = ?1 and o.user = ?2 ")
	List<Order> getOrder(Store store, User user);
	
	@Query("SELECT COUNT(o) FROM Order o WHERE o.store = ?1")
	Integer countOrderInStore(Store store);
	
}
