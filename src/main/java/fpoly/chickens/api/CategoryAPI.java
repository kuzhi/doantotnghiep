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
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.entity.Category;
import fpoly.chickens.service.CategoryService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/category")
public class CategoryAPI {
	@Autowired
	CategoryService categoryService;
	
	@GetMapping
	public List<Category> findAll() {
		return categoryService.findAll();
	}
	
	// Create
	@PostMapping
	public ResponseEntity<Category> create(@RequestBody Optional<Category> category) {
		if(category.isPresent()) {
			categoryService.create(category.get());
		}
			
		return  ResponseEntity.ok().build();
	}
		
	// Update
	@PutMapping("{id}")
	public ResponseEntity<Void> update(@PathVariable("id") Optional<String> id,
			@RequestBody Category category) {
		categoryService.update(category);
		
		return ResponseEntity.ok().build();
	}
		
	// Delete
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		categoryService.delete(id);
	}
}
