package fpoly.chickens.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.OrderPack;
import fpoly.chickens.entity.ReportPack;
import fpoly.chickens.entity.Store;

public interface OrderPackDAO extends JpaRepository<OrderPack, Integer> {

	@Query("SELECT COUNT(o) FROM OrderPack o")
	Integer countOrderPack();

	@Query("SELECT o FROM OrderPack o")
	Page<OrderPack> findAllOrderpack(Pageable pageable);

	@Query("SELECT o FROM OrderPack o WHERE o.orderpackcode LIKE ?1")
	Page<OrderPack> findOrderpackbyKey(String keyword, Pageable pageable);

	@Query("SELECT o FROM OrderPack o WHERE o.store = ?1")
	List<OrderPack> findAllByStore(Store store);
	
//	Count orderPack
	@Query("SELECT COUNT(o) FROM OrderPack o WHERE o.Create_at BETWEEN ?1 AND ?2 AND o.Status = ?3")
	Integer countOrderPackByDate(Date dateStart, Date dateEnd, Integer status);
// Lấy doanh thu
	@Query("SELECT new ReportPack(o.pack.Name, o.pack.Price, (count(o.pack.Id)*o.pack.Price), count(o.pack.Id)) "
			+ " FROM OrderPack o "
			+ " WHERE o.Create_at BETWEEN ?1 AND ?2 AND o.Status = ?3 "
			+ " GROUP BY o.pack.Name, o.pack.Price "
			+ " ORDER BY (count(o.pack.Id)*o.pack.Price) DESC ")
	List<ReportPack> getSale(Date dateStart, Date dateEnd, Integer status);
	
	
}
