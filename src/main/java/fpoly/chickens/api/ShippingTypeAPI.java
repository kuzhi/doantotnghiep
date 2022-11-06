package fpoly.chickens.api;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import fpoly.chickens.entity.ShippingType;
import fpoly.chickens.service.ShippingTypeService;

@CrossOrigin("*")
@RestController
public class ShippingTypeAPI {
	
	@Autowired
	ShippingTypeService shippingTypeService;

	@GetMapping("/api/shipping")
	public ResponseEntity<List<ShippingType>> getShip() {
		return ResponseEntity.ok(shippingTypeService.getShippingType());
	}
}
