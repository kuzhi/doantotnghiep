package fpoly.chickens.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.OrderPack;

public interface OrderPackDAO extends JpaRepository<OrderPack, Integer> {
	@Query("SELECT o FROM OrderPack o WHERE o.Status = ?1")
	Page<OrderPack> findAllByStoreAndStatus(Integer status, Pageable pageable);
}
