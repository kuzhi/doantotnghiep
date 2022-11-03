package fpoly.chickens.service;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

import fpoly.chickens.entity.Cart;

public interface CartService {
	List<Cart> getCart(Integer storeid, Integer userid);


	void add(JsonNode orderData);

}
