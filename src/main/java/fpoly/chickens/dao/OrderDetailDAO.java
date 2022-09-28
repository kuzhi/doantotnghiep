package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fpoly.chickens.entity.OrderDetail;



public interface OrderDetailDAO extends JpaRepository<OrderDetail, Integer> {

}
