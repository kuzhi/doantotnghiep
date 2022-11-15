package fpoly.chickens.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import fpoly.chickens.entity.OrderPack;
import fpoly.chickens.service.OrderPackService;

@CrossOrigin("*")
@RestController
public class OrderPackAPI {

	@Autowired
	OrderPackService orderPackService;

	@GetMapping("/api/orderpackall/{page}")
	public ResponseEntity<Page<OrderPack>> getOrderPack(@PathVariable("page") Optional<Integer> page) {
		return ResponseEntity.ok(orderPackService.getOrderPack(page.orElse(0)));
	}

	@GetMapping("/api/orderpack/{status}/{page}")
	public ResponseEntity<Page<OrderPack>> getOrderPackbyStatus(@PathVariable("status") Optional<Integer> status,
			@PathVariable("page") Optional<Integer> page) {
		return ResponseEntity.ok(orderPackService.getOrderPackByStatus(status.get(), page.orElse(0)));
	}

	@PostMapping("/api/orderpack/add")
	public ResponseEntity<Void> addOrderPack(@RequestBody OrderPack orderPackData) {
		orderPackService.addOrderPack(orderPackData);
		return ResponseEntity.ok().build();

	}

	@PostMapping("/api/orderpack/update")
	public ResponseEntity<Void> confirmOrderPack(@RequestBody OrderPack orderPackData) {
		orderPackService.updateOrderPack(orderPackData);
		return ResponseEntity.ok().build();

	}

}
