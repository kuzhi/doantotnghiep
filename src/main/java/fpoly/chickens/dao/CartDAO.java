package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Cart;


public interface CartDAO extends JpaRepository<Cart, Integer> {
	@Query("SELECT o FROM Cart o WHERE o.store.id = ?1 and o.user.id = ?2")
	List<Cart> getCart(Integer storeid, Integer userid);
}
