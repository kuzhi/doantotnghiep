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

	// Load
	@GetMapping("store/{storeid}")
	public List<Product> findAllByStore(@PathVariable("storeid") Optional<Integer> storeid) {
		Boolean delete = false;
		
		return productService.findAllProductByStore(storeid.get(), delete);
	}

	// Load status == true
	@GetMapping("store/{storeid}/{status}")
	public List<Product> findAllByStoreWithStatus(@PathVariable("storeid") Optional<Integer> storeid,
			@PathVariable("status") Optional<Boolean> status) {
		return productService.findAllProductByStoreWithStatus(storeid.get(), status.get());
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
	@GetMapping("/{nameProduct}/{storeid}")
	public ResponseEntity<List<Product>> findByName(
			@PathVariable("nameProduct") Optional<String> nameProduct,
			@PathVariable("storeid") Optional<Integer> storeid) {
		
		return ResponseEntity.ok(productService.findProductByName("%"+nameProduct.get()+"%", storeid.get()));
	}
	
	// Sort A-Z
	@GetMapping("/sort/a-z/{storeid}")
	public List<Product> sortAZ(@PathVariable("storeid") Optional<Integer> storeid) {
		return productService.sortAZ(storeid.get());
	}
	
	// Sort A-Z
	@GetMapping("/sort/z-a/{storeid}")
	public List<Product> sortZA(@PathVariable("storeid") Optional<Integer> storeid) {
		return productService.sortZA(storeid.get());
	}
	
	// Sort A-Z
	@GetMapping("/sort/0-9/{storeid}")
	public List<Product> sort09(@PathVariable("storeid") Optional<Integer> storeid) {
		return productService.sort09(storeid.get());
	}
	
	// Sort A-Z
	@GetMapping("/sort/9-0/{storeid}")
	public List<Product> sort90(@PathVariable("storeid") Optional<Integer> storeid) {
		return productService.sort90(storeid.get());
	}

	// Sort Category
	@GetMapping("/sort/{categoryid}")
	public List<Product> sortCategory(@PathVariable("categoryid") Integer categoryid) {
		return productService.sortCategory(categoryid);
	}
}
