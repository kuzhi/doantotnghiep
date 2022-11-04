package fpoly.chickens.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.entity.Product;
import fpoly.chickens.service.ProductService;

@CrossOrigin("*")
@RestController
public class ProductAPI {
	@Autowired
	ProductService productService;
	
	@GetMapping("/api/product/view")
	public List<Product> findAll() {
		return productService.findAll();
	}
}
