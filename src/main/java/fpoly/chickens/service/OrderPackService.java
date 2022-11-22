 package fpoly.chickens.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;

import fpoly.chickens.entity.OrderPack;
import fpoly.chickens.entity.ReportPack;

public interface OrderPackService {

	void addOrderPack(OrderPack orderPackData);

	void updateOrderPack(OrderPack orderPackData);

	Page<OrderPack> getOrderPack(Integer page,String field,Integer checkSort);

	List<OrderPack> getOrderPackStore(Integer storeid);

	OrderPack getOrderPackId(Integer id);

	Page<OrderPack> getOrderPackKeyword(String keyword);

	Integer countOrderPackByDate(Date dateStart, Date dateEnd, Integer status);
	
	List<ReportPack> getSale(Date dateStart, Date dateEnd, Integer status);
}
