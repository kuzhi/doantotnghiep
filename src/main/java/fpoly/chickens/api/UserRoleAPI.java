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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.entity.UserRoleApp;
import fpoly.chickens.service.UserRoleAppService;
import fpoly.chickens.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/authorities")
public class UserRoleAPI {

    @Autowired
    UserRoleAppService uService;

	@Autowired
    UserService userService;

    @GetMapping()
	public List<UserRoleApp> findAllUsersRole( @RequestParam("admin") Optional<Boolean> admin) {
		if(admin.orElse(false)) {
			return uService.findAuthoritiesOfAdmin();
		}
		return uService.findAll();
	}


    
	@GetMapping("{id}")
	public ResponseEntity<List<UserRoleApp>> findUsersRoleById(@PathVariable("id") Optional<Integer> id) {
		if(id.isPresent()) {
			List<UserRoleApp> student = uService.findUserRoleAppByUserId(id.get());
			if (student.isEmpty()) {
				
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(student);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping()
	public UserRoleApp Create(@RequestBody UserRoleApp user) {
		return uService.create(user);
	}

	@PutMapping("{id}")
	public ResponseEntity<UserRoleApp> Update(@PathVariable("id") Integer id, @RequestBody UserRoleApp user) {
		if (!uService.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		uService.create(user);
		return ResponseEntity.ok(user);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<UserRoleApp> delete(@PathVariable("id") Integer id ){
		if (!uService.existsById(id)) {
			return ResponseEntity.badRequest().build();
		}
		
		UserRoleApp user = uService.findByIds(id);
		Integer currentUser = Integer.parseInt(userService.getTokenUserApp());
		Integer count = uService.countRoleByUserId(user.getUserapp().getId());
		
		if(count == 1 || user.getUserapp().getId() == currentUser){
			
			return ResponseEntity.badRequest().build();
		}
		
		uService.delete(id);
		return ResponseEntity.ok().build();
	}
}
