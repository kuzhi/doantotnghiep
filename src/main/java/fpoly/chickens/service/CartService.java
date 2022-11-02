package fpoly.chickens.service;

import java.util.List;

import fpoly.chickens.entity.Cart;

public interface CartService {
	List<Cart> getCart(Integer storeid, Integer userid);

}
