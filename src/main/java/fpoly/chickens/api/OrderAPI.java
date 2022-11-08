package fpoly.chickens.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import fpoly.chickens.entity.Order;
import fpoly.chickens.service.OrderService;

@CrossOrigin("*")
@RestController
public class OrderAPI {
	@Autowired
	OrderService orderService;

	@GetMapping("/api/order/{storeid}")
	public ResponseEntity<List<Order>> getOrderStore4(@PathVariable("storeid") Optional<Integer> storeid) {
		return ResponseEntity.ok(orderService.getOrderStore(storeid.get()));
	}

	@GetMapping("/api/order/{storeid}/{userid}")
	public ResponseEntity<List<Order>> getAllOrders(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("userid") Optional<Integer> userid) {
		return ResponseEntity.ok(orderService.getAllOrders(storeid.get(), userid.get()));
	}

	@GetMapping("/api/order/{storeid}/{userid}/{status}")
	public ResponseEntity<List<Order>> getLoadOrders(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("userid") Optional<Integer> userid, @PathVariable("status") Optional<Integer> status) {
		return ResponseEntity.ok(orderService.getOrdersbyStatus(storeid.get(), userid.get(), status.get()));
	}

	@PostMapping("/api/order/add")
	public ResponseEntity<Void> addOrder(@RequestBody JsonNode orderData) {
		orderService.addOrder(orderData);
		return ResponseEntity.ok().build();

	}

	@PutMapping("/api/order/update")
	public ResponseEntity<Void> confirmOrder(@RequestBody JsonNode orderData) {
		orderService.updateOrder(orderData);
		return ResponseEntity.ok().build();

	}

	@PutMapping("/api/order/cancel")
	public ResponseEntity<Void> cancelOrder(@RequestBody JsonNode orderData) {
		orderService.cancelOrder(orderData);
		return ResponseEntity.ok().build();

	}

}
