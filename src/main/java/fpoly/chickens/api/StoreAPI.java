package fpoly.chickens.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;
import fpoly.chickens.service.StoreService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/store")
public class StoreAPI {
	@Autowired
	StoreService storeService;

	@GetMapping
	public List<Store> findAll() {
		return storeService.findAll();
	}

	@GetMapping("{userid}")
	public Store findAll(@PathVariable("userid") Optional<Integer> userid) {
		return storeService.findByUserid(userid.get());
	}

	@GetMapping("/list/{userid}")
	public List<Store> findAllStore(@PathVariable("userid") Optional<Integer> userid) {
		return storeService.findStoreById(userid.get());
	}

	// update
	@PatchMapping("{id}")
	public ResponseEntity<Object> update(@PathVariable("id") Optional<Integer> id,
			@RequestBody Store Store) {
		storeService.update(Store);
		return ResponseEntity.ok().build();
	}

	// Delete
	@DeleteMapping("/{storeid}")
	public void delete(@PathVariable("storeid") Integer storeid) {
		storeService.deleteStore(storeid);
	}

	// Create
	@PostMapping
	public ResponseEntity<Store> create(@RequestBody Optional<Store> store) {
		if (store.isPresent()) {
			storeService.create(store.get());
		}

		return ResponseEntity.ok().build();
	}

	// Find by name
	@GetMapping("/name/{storeName}")
	public ResponseEntity<List<Store>> findByName(@PathVariable("storeName") Optional<String> storeName) {
		return ResponseEntity.ok(storeService.findStoreByName("%" + storeName.get() + "%"));
	}

	// Sort A-Z
	@GetMapping("/sort/a-z")
	public List<Store> sortAZ() {
		return storeService.sortAZ();
	}

	// Sort A-Z
	@GetMapping("/sort/z-a")
	public List<Store> sortZA() {
		return storeService.sortZA();
	}
}
