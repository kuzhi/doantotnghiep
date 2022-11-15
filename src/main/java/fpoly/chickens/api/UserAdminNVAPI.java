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

import fpoly.chickens.entity.UserApp;
import fpoly.chickens.service.UploadService;
import fpoly.chickens.service.UserAdminNVService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/userApp")
public class UserAdminNVAPI {
	@Autowired
	UserAdminNVService userAdminNVService;
	@Autowired
	UploadService uploadService;

	// Load
	@GetMapping
	public List<UserApp> findAll() {
		return userAdminNVService.findAll();
	}

	// Load
	@GetMapping("deleted/{deleted}")
	public List<UserApp> loadUserWithDeleted(@PathVariable("deleted") Optional<Boolean> deleted) {
		return userAdminNVService.loadUserWithDeleted(deleted.get());
	}

	// Create
	@PostMapping
	public ResponseEntity<UserApp> create(@RequestBody Optional<UserApp> userapp) {
		if (userapp.isPresent()) {
			userAdminNVService.create(userapp.get());
		}

		return ResponseEntity.ok().build();
	}

	// Update
	@PutMapping("{id}")
	public ResponseEntity<Void> update(@PathVariable("id") Optional<String> id, @RequestBody UserApp userapp) {
		userAdminNVService.update(userapp);

		return ResponseEntity.ok().build();
	}

	// Delete
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		userAdminNVService.delete(id);
	}

	// Find by name
	@GetMapping("/{nameUser}")
	public ResponseEntity<List<UserApp>> findByName(@PathVariable("nameUser") Optional<String> nameUser) {
		return ResponseEntity.ok(userAdminNVService.findUserByName("%" + nameUser.get() + "%"));
	}

	// Find by user name
	@GetMapping("id/{nameUserName}")
	public ResponseEntity<List<UserApp>> findByUserName(@PathVariable("nameUserName") Optional<String> nameUser) {
		return ResponseEntity.ok(userAdminNVService.findUserByUserName("%" + nameUser.get() + "%"));
	}

	// Find by user name
	@GetMapping("id/name/{nameUserName}/{nameUser}")
	public ResponseEntity<List<UserApp>> findByUserNameAndFullName(
			@PathVariable("nameUserName") Optional<String> nameUserName,
			@PathVariable("nameUser") Optional<String> nameUser) {
		return ResponseEntity.ok(userAdminNVService.findUserByUserNameAndFullName("%" + nameUserName.get() + "%",
				"%" + nameUser.get() + "%"));
	}

	// Sort A-Z
	@GetMapping("/sort/a-z")
	public List<UserApp> sortAZ() {
		return userAdminNVService.sortAZ();
	}

	// Sort A-Z
	@GetMapping("/sort/z-a")
	public List<UserApp> sortZA() {
		return userAdminNVService.sortZA();
	}

	// Sort A-Z
	@GetMapping("/sort/0-9")
	public List<UserApp> sort09() {
		return userAdminNVService.hoatDong();
	}

	// Sort A-Z
	@GetMapping("/sort/9-0")
	public List<UserApp> sort90() {
		return userAdminNVService.ngungHoatDong();
	}
}
