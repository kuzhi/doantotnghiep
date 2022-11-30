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

import fpoly.chickens.dao.RoleAppDAO;
import fpoly.chickens.entity.RoleApp;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/roles")
public class RoleAPI {
    
    @Autowired
	RoleAppDAO roleDao;

	@GetMapping()
	public ResponseEntity<List<RoleApp>> findAllRole() {
		return ResponseEntity.ok(roleDao.findAll());
	}

	@GetMapping("{id}")
	public ResponseEntity<RoleApp> findRoleById(@PathVariable("id") Optional<String> id) {
        Integer roleId = Integer.parseInt(id.get());

		Optional<RoleApp> student = roleDao.findById(roleId);
		if (!student.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(student.get());
	}

	@PostMapping()
	public ResponseEntity<RoleApp> Create(@RequestBody RoleApp user) {
		if (roleDao.existsById(user.getId())) {
			return ResponseEntity.badRequest().build();
		}
		roleDao.saveAndFlush(user);
		return ResponseEntity.ok(user);
	}

	@PutMapping("{id}")
	public ResponseEntity<RoleApp> Update(@PathVariable("id") Optional<String> id,
			@RequestBody RoleApp user) {

                Integer roleId = Integer.parseInt(id.get());
		if (!roleDao.existsById(roleId)) {
			return ResponseEntity.notFound().build();
		}
		roleDao.saveAndFlush(user);
		return ResponseEntity.ok(user);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") Optional<String> id) {
        Integer roleId = Integer.parseInt(id.get());

		if (!roleDao.existsById(roleId)) {
			return ResponseEntity.badRequest().build();
		}
		roleDao.deleteById(roleId);
		return ResponseEntity.ok().build();
	}

}
