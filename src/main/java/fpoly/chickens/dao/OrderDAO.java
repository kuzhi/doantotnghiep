package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fpoly.chickens.entity.Order;

public interface OrderDAO extends JpaRepository<Order, String>{

}
