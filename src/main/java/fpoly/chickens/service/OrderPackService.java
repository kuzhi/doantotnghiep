package fpoly.chickens.service;

import org.springframework.data.domain.Page;

import fpoly.chickens.entity.OrderPack;

public interface OrderPackService {

	void addOrderPack(OrderPack orderPackData);

	void updateOrderPack(OrderPack orderPackData);

	Page<OrderPack> getOrderPack(Integer page);

	Page<OrderPack> getOrderPackByStatus(Integer status, Integer page);

}
