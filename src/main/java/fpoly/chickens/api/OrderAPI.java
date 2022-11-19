package fpoly.chickens.api;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

	@GetMapping("/api/order/store/{storeid}/{page}/{field}/{sort}")
	public ResponseEntity<Page<Order>> getOrderStore(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("page") Optional<Integer> page,@PathVariable("field") Optional<String> field,@PathVariable("sort") Optional<Integer> sort) {
		return ResponseEntity.ok(orderService.getOrderStore(storeid.get(), page.orElse(0),field.orElse("Ordercode"),sort.orElse(0)));
	}
	

	@GetMapping("/api/orders/store/{storeid}/{status}/{page}/{field}/{sort}")
	public ResponseEntity<Page<Order>> getOrderStorebyStatus(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("status") Optional<Integer> status, @PathVariable("page") Optional<Integer> page,@PathVariable("field") Optional<String> field,@PathVariable("sort") Optional<Integer> sort) {
		return ResponseEntity.ok(orderService.getOrderStoreByStatus(storeid.get(),status.get(),page.orElse(0),field.orElse("Ordercode"),sort.orElse(0)));
	}
	
	@GetMapping("/api/findorders/storeandkeyword/{storeid}/{keyword}")
	public ResponseEntity<Page<Order>> getOrderStorebyKeyword(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("keyword") Optional<String> keyword) {
		return ResponseEntity.ok(orderService.getOrderStoreByKeyword(storeid.get(),keyword.get()));
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

	// Count order
	@GetMapping("/api/count/order/{storeid}/{dateStart}/{dateEnd}")
	public ResponseEntity<Integer> getOrderInDate(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("dateStart") Optional<Date> dateStart, @PathVariable("dateEnd") Optional<Date> dateEnd) throws ParseException {
		
		return ResponseEntity.ok(orderService.getOrderInDate(storeid.get(), dateStart.get(), dateEnd.get()));
	}

	@GetMapping("/api/count/order/{storeid}/{dateStart}/{dateEnd}/{status}")
	public ResponseEntity<List<Order>> getOrderInDateWithStatus(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("dateStart") Optional<Date> dateStart, @PathVariable("dateEnd") Optional<Date> dateEnd,
			@PathVariable("status") Optional<Integer> status) throws ParseException {
		
		return ResponseEntity.ok(orderService.countOrderInDateWithStatus(storeid.get(), dateStart.get(), dateEnd.get(), status.get()));
	}
	
	// Get doanh thu
	@GetMapping("/api/sale/order/{storeid}/{dateStart}/{dateEnd}")
	public ResponseEntity<Integer> getSaleOrderInDate(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("dateStart") Optional<Date> dateStart, @PathVariable("dateEnd") Optional<Date> dateEnd) throws ParseException {
		
		return ResponseEntity.ok(orderService.getSaleOrderInDate(storeid.get(), dateStart.get(), dateEnd.get()));
	}
}
