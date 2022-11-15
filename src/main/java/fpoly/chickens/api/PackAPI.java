package fpoly.chickens.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
}
