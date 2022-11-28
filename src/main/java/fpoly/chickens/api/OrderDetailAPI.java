package fpoly.chickens.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.service.OrderDetailService;

@CrossOrigin("*")
@RestController
public class OrderDetailAPI {
	
	@Autowired
	OrderDetailService orderDetailService;
	
	@GetMapping("/api/orderdetail/{orderid}")
	public ResponseEntity<List<OrderDetail>> getOrderStore(@PathVariable("orderid") Optional<Integer> id) {
		return ResponseEntity.ok(orderDetailService.findByOrder(id.get()));
	}

	@GetMapping("/api/orderdetail/get-product-id/{productid}")
	public ResponseEntity<List<OrderDetail>> getOrderDetailByProduct(@PathVariable("productid") Optional<Integer> id) {
		return ResponseEntity.ok(orderDetailService.findOrderDetailByProductId(id.get()));
	}
	
}
