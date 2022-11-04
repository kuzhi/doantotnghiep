package fpoly.chickens.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import fpoly.chickens.entity.Cart;
import fpoly.chickens.service.CartService;

@CrossOrigin("*")
@RestController
public class CartAPI {

	@Autowired
	CartService cartservice;

	@GetMapping("/api/cart/{storeid}/{userid}")
	public ResponseEntity<List<Cart>> getCart(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("userid") Optional<Integer> userid) {
		return ResponseEntity.ok(cartservice.getCart(storeid.get(), userid.get()));
	}

	@PostMapping("/api/cart/add")
	public ResponseEntity<Void> add(@RequestBody JsonNode cartData) {
		cartservice.add(cartData);
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/api/cart/update")
	public ResponseEntity<Void> update(@RequestBody JsonNode cartData) {
		cartservice.update(cartData);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/api/cart/delete/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") Optional<Integer> id) {
		cartservice.delete(id.get());
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/api/cart/deleteall/{storeid}/{userid}")
	public ResponseEntity<Void> delete(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("userid") Optional<Integer> userid) {
		cartservice.deleteAll(storeid.get(),userid.get());
		return ResponseEntity.ok().build();
	}
}
