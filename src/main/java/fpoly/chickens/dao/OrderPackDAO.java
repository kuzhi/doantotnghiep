package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.OrderPack;
import fpoly.chickens.entity.Store;

public interface OrderPackDAO extends JpaRepository<OrderPack, Integer> {

	@Query("SELECT COUNT(o) FROM OrderPack o")
	Integer countOrderPack();

	@Query("SELECT o FROM OrderPack o")
	Page<OrderPack> findAllOrderpack(Pageable pageable);

	@Query("SELECT o FROM OrderPack o WHERE o.Orderpackcode LIKE ?1")
	Page<OrderPack> findOrderpackbyKey(String keyword, Pageable pageable);

	@Query("SELECT o FROM OrderPack o WHERE o.store = ?1")
	List<OrderPack> findAllByStore(Store store);
}
