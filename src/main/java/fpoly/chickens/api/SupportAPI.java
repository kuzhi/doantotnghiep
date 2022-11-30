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
import org.springframework.web.bind.annotation.RestController;
import fpoly.chickens.entity.Support;
import fpoly.chickens.service.SupportService;

@CrossOrigin("*")
@RestController
public class SupportAPI {
	
	@Autowired
	SupportService supportService;
	
	@GetMapping("/api/support")
	public ResponseEntity<List<Support>> getPayment() {
		return ResponseEntity.ok(supportService.findAll());
	}


	
	@GetMapping("/api/support/{supportId}")
	public ResponseEntity<Support> findById(@PathVariable("supportId") Optional<Integer> supportId ) {
		if(supportId.isPresent()){
			return ResponseEntity.ok(supportService.findById(supportId.get()));

		}

		return null;
	}

	@GetMapping("/api/support/findByNhanVien/{supportId}")
	public ResponseEntity <List<Support>> findByNhanVien(@PathVariable("supportId") Optional<Integer> supportId ) {
		if(supportId.isPresent()){
			return ResponseEntity.ok(supportService.findByUserAppId(supportId.get()));

		}

		return null;
	}

	@PatchMapping("/api/support/update")
	public ResponseEntity<Support> updateById(@RequestBody Optional<Support> support ) {
		if(support.isPresent()){
			supportService.update(support.get());
		}

		 return ResponseEntity.ok().build();
	}


	@PostMapping("/api/support/update")
	public ResponseEntity<Support> update(@RequestBody Optional<Support> support ) {
		if(support.isPresent()){
			
			supportService.create(support.get());
		}

		 return ResponseEntity.ok().build();
	}

	@DeleteMapping("/api/support/delete/{deleteId}")
	public ResponseEntity<Support> create(@PathVariable("deleteId") Optional<Integer> deleteId ) {
		if(deleteId.isPresent()){
			
			supportService.delete(deleteId.get());
		}

		 return ResponseEntity.ok().build();
	}

	


}