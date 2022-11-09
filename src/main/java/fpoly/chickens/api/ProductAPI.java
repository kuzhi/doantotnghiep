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
	
	// Load
	@GetMapping
	public List<Product> findAll() {
		return productService.findAll();
	}
	
	// Create
	@PostMapping
	public ResponseEntity<Product> create(@RequestBody Optional<Product> product) {
		if(product.isPresent()) {
			productService.create(product.get());
		}
			
		return  ResponseEntity.ok().build();
	}
	
	// Update
	@PutMapping("{id}")
	public ResponseEntity<Void> update(@PathVariable("id") Optional<String> id,
			@RequestBody Product product) {
		productService.update(product);
		
		return ResponseEntity.ok().build();
	}
	
	// Delete
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		productService.delete(id);
	}
	
	// Find by name
	@GetMapping("/{nameProduct}")
	public ResponseEntity<List<Product>> findByName(
			@PathVariable("nameProduct") Optional<String> nameProduct) {
		return ResponseEntity.ok(productService.findProductByName("%"+nameProduct.get()+"%"));
	}
	
	// Sort A-Z
	@GetMapping("/sort/a-z")
	public List<Product> sortAZ() {
		return productService.sortAZ();
	}
	
	// Sort A-Z
	@GetMapping("/sort/z-a")
	public List<Product> sortZA() {
		return productService.sortZA();
	}
	
	// Sort A-Z
	@GetMapping("/sort/0-9")
	public List<Product> sort09() {
		return productService.sort09();
	}
	
	// Sort A-Z
	@GetMapping("/sort/9-0")
	public List<Product> sort90() {
		return productService.sort90();
	}
}
