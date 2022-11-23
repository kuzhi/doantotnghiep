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

import fpoly.chickens.entity.Pack;
import fpoly.chickens.service.PackService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/pack")
public class PackAPI {
	@Autowired PackService packService;
	
	// Load
	@GetMapping
	public List<Pack> findAll() {
		return packService.findAll();
	}
	
	// Create
	@PostMapping
	public ResponseEntity<Pack> create(@RequestBody Optional<Pack> product) {
		if(product.isPresent()) {
			packService.create(product.get());
		}
			
		return  ResponseEntity.ok().build();
	}
	
	// Update
	@PutMapping("{id}")
	public ResponseEntity<Void> update(@PathVariable("id") Optional<String> id,
			@RequestBody Pack product) {
		packService.update(product);
		
		return ResponseEntity.ok().build();
	}
	
	// Delete
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		packService.delete(id);
	}
	
	// Find by name
	@GetMapping("/{name}")
	public ResponseEntity<List<Pack>> findByName(
			@PathVariable("name") Optional<String> name) {
		return ResponseEntity.ok(packService.findProductByName("%"+name.get()+"%"));
	}
	
	// Sort A-Z
	@GetMapping("/sort/a-z")
	public List<Pack> sortAZ() {
		return packService.sortAZ();
	}
	
	// Sort A-Z
	@GetMapping("/sort/z-a")
	public List<Pack> sortZA() {
		return packService.sortZA();
	}
	
	// Sort A-Z
	@GetMapping("/sort/0-9")
	public List<Pack> sort09() {
		return packService.sort09();
	}
	
	// Sort A-Z
	@GetMapping("/sort/9-0")
	public List<Pack> sort90() {
		return packService.sort90();
	}
}
