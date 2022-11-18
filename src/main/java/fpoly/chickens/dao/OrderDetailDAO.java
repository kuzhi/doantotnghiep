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
			+ " FROM OrderDetail o " + " GROUP BY o.product.Id, o.product.Name, o.product.Image, o.product.Price "
			+ " ORDER BY sum(o.Amount) DESC")
	List<ReportOverViewApp> top5Product();

	@Query("SELECT o FROM OrderDetail o WHERE o.order = ?1")
	List<OrderDetail> findOrderDetailByOrder(Order order);
	
	// Lấy labels : chart
	@Query("SELECT o.product.Name FROM OrderDetail o WHERE o.order.store = ?1 AND o.Create_at BETWEEN ?2 AND ?3 "
			+ " GROUP BY o.product.Name")
	ArrayList<String> loadOrderDetailByDate(Store store, Date dateStar, Date dateEnd);
	// Lấy data : chart
	@Query("SELECT new ReportProductApp(o.product.Id, o.TotalMoney*o.Amount) FROM OrderDetail o WHERE o.order.store = ?1 AND o.Create_at BETWEEN ?2 AND ?3")
	List<ReportProductApp> loadDataOrderDetailByDate(Store store, Date dateStar, Date dateEnd);
	
	//====== Lấy id
	@Query("SELECT o.product.Id FROM OrderDetail o WHERE o.order.store = ?1 AND o.Create_at BETWEEN ?2 AND ?3 "
			+ " GROUP BY o.product.Id")
	ArrayList<String> getIdforReport(Store store, Date dateStar, Date dateEnd);
	//====== Lấy dữ liệu từ id
	@Query("SELECT SUM(o.Amount*o.TotalMoney) FROM OrderDetail o WHERE o.order.store = ?1 AND o.Create_at BETWEEN ?2 AND ?3 AND o.product.Id = ?4 ")
	Integer getTotalReport(Store store, Date dateStar, Date dateEnd, Integer productId);
}