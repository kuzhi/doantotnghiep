package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.ReportOverViewApp;

public interface OrderDetailDAO extends JpaRepository<OrderDetail, Integer> {
	@Query("SELECT new ReportOverViewApp(o.product.Id, o.product.Name, o.product.Image, o.product.Price, sum(o.Amount)) "
			+ " FROM OrderDetail o "
			+ " GROUP BY o.product.Id, o.product.Name, o.product.Image, o.product.Price "
			+ " ORDER BY sum(o.Amount) DESC")
	List<ReportOverViewApp> top5Product();
}
