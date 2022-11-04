package fpoly.chickens.api;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import fpoly.chickens.entity.PaymentType;
import fpoly.chickens.service.PaymentTypeService;

@CrossOrigin("*")
@RestController
public class PaymentTypeAPI {
	
	@Autowired
	PaymentTypeService paymentTypeService;
	
	@GetMapping("/api/payment")
	public ResponseEntity<List<PaymentType>> getPayment() {
		return ResponseEntity.ok(paymentTypeService.getPayment());
	}
}
