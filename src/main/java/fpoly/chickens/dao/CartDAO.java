package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fpoly.chickens.entity.Cart;

public interface CartDAO extends JpaRepository<Cart, Integer> {

}
