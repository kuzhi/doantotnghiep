package fpoly.chickens.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import fpoly.chickens.entity.Order;
import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.Store;

public interface OrderDetailService {
	List<OrderDetail> findByOrder(Integer integer);
	
	List<OrderDetail> findOrderDetailByProductId(Integer id);
}
