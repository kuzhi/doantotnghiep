package fpoly.chickens.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Order;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;

public interface OrderDAO extends JpaRepository<Order, Integer> {

	@Query("SELECT o  FROM Order o where o.store = ?1 and o.user = ?2 ")
	List<Order> getOrder(Store store, User user);

	@Query("SELECT o  FROM Order o where o.store = ?1 and o.user = ?2 and o.Status = ?3")
	List<Order> getOrdersStatus(Store store, User user, Integer Status);

	@Query("SELECT COUNT(o) FROM Order o WHERE o.store = ?1")
	Integer countOrderInStore(Store store);

	@Query("SELECT o FROM Order o WHERE o.store = ?1 ")
	Page<Order> findAllByStore(Store store, Pageable pageable);

	@Query("SELECT o FROM Order o WHERE o.store = ?1 and o.Status = ?2")
	Page<Order> findAllByStoreAndStatus(Store store, Integer status, Pageable pageable);
	
	@Query("SELECT o FROM Order o WHERE o.store = ?1 and o.Ordercode LIKE ?2")
	Page<Order> findAllByStoreAndOrdercode(Store store, String ordercode, Pageable pageable);

	// Get order in day || month
	@Query("SELECT COUNT(o) FROM Order o WHERE o.store = ?1 AND o.Create_at BETWEEN ?2 AND ?3")
	Integer countOrderInDate(Store store, Date dateStar, Date dateEnd);

	@Query("SELECT COUNT(o) FROM Order o WHERE o.store = ?1 AND o.Create_at BETWEEN ?2 AND ?3 AND o.Status = ?4")
	Integer countOrderInDateWithStatus2(Store store, Date dateStar, Date dateEnd, Integer status);
	
	// Get order in month status 
	// == 3 Thành công
	// == 5 Bị hủy
	@Query("SELECT o FROM Order o WHERE o.store = ?1 AND o.Status = ?4 AND o.Create_at BETWEEN ?2 AND ?3")
	List<Order> countOrderInDateWithStatus(Store store, Date dateStar, Date dateEnd, Integer Status);
	
	// Get doanh thu in day || month ((=
	@Query("SELECT SUM(o.TotalMoney) FROM Order o WHERE o.store = ?1 AND o.Create_at BETWEEN ?2 AND ?3 AND o.Status = ?4 ")
	Integer getOrderInDate(Store store, Date dateStar, Date dateEnd, Integer Status);
	
}
