package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Cart;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;


public interface CartDAO extends JpaRepository<Cart, Integer> {
	@Query("SELECT o FROM Cart o WHERE o.store = ?1 and o.user = ?2")
	List<Cart> getCart(Store store, User user);
}
