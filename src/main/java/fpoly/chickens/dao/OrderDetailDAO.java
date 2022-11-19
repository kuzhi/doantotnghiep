package fpoly.chickens.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Order;
import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.ReportOverViewApp;
import fpoly.chickens.entity.ReportProductApp;
import fpoly.chickens.entity.Store;

public interface OrderDetailDAO extends JpaRepository<OrderDetail, Integer> {
	@Query("SELECT new ReportOverViewApp(o.product.Id, o.product.Name, o.product.Image, o.product.Price, sum(o.Amount)) "
			+ " FROM OrderDetail o " 
			+ " WHERE o.order.Status = ?1 "
			+ " GROUP BY o.product.Id, o.product.Name, o.product.Image, o.product.Price "
			+ " ORDER BY sum(o.Amount) DESC")
	List<ReportOverViewApp> top5Product(Integer status);

	@Query("SELECT new ReportProductApp(o.product.Name, SUM(o.TotalMoney*o.Amount)) "
			+ " FROM OrderDetail o "
			+ " WHERE o.order.store = ?3 AND o.Create_at BETWEEN ?1 AND ?2 AND o.order.Status = ?4 "
			+ " GROUP BY o.product.Name ")
	List<ReportProductApp> top10Product(Date dateStart, Date dateEnd, Store storeid, Integer status);

	@Query("SELECT o FROM OrderDetail o WHERE o.order = ?1")
	List<OrderDetail> findOrderDetailByOrder(Order order);
	
}