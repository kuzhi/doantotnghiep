package fpoly.chickens.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fpoly.chickens.entity.Product;
import fpoly.chickens.service.ProductService;
import fpoly.chickens.service.UploadService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/product")
public class ProductAPI {
	@Autowired
	ProductService productService;
	@Autowired
	UploadService uploadService;
	
	@GetMapping
	public List<Product> findAll() {
		return productService.findAll();
	}
	
	@PostMapping
	public ResponseEntity<Product> create(@RequestBody Optional<Product> product) {
		if(product.isPresent()) {
			productService.create(product.get());
		}
			
		return  ResponseEntity.ok().build();
	}
}
