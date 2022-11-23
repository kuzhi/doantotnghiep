package fpoly.chickens.service;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

import fpoly.chickens.entity.Cart;

public interface CartService {
	List<Cart> getCart(Integer storeid, Integer userid);


	void add(JsonNode cartData);


	void update(JsonNode cartData);



	void delete(Integer id);


	void deleteAll(Integer storeid, Integer userid);

	Integer countCart(Integer storeid, Integer userid);

}
