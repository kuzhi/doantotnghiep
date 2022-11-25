package fpoly.chickens.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.entity.Store;
import fpoly.chickens.service.StoreService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/store")
public class StoreAPI {
	@Autowired StoreService storeService;
	
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
}
