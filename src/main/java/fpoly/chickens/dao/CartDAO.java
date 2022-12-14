package fpoly.chickens.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Cart;
import fpoly.chickens.entity.Product;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;

public interface CartDAO extends JpaRepository<Cart, Integer> {
	@Query("SELECT o FROM Cart o WHERE o.store = ?1 and o.user = ?2")
	List<Cart> getCart(Store store, User user);

	@Query("SELECT o FROM Cart o WHERE o.user=?1 and o.product=?2")
	Cart checkProductInCart(User user, Product sp);
	
	@Query("SELECT COUNT(o) FROM Cart o WHERE o.store = ?1 and o.user = ?2")
	Integer countCart(Store store, User user);

	@Transactional
	@Modifying
	@Query("DELETE FROM Cart o WHERE o.store = ?1 and o.user = ?2")
	void DeleteAll(Store store, User user);

}
