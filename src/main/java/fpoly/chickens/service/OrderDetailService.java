package fpoly.chickens.service;

import java.util.List;

import fpoly.chickens.entity.OrderDetail;

public interface OrderDetailService {

	List<OrderDetail> findByOrder(Integer integer);
}
