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

import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.UploadService;
import fpoly.chickens.service.UserAdminKHService;
import fpoly.chickens.service.UserAdminService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/userStore")
public class UserAdminKHAPI {
	@Autowired
	UserAdminKHService userAdminKHService;
	@Autowired
	UploadService uploadService;

	// Load
	@GetMapping
	public List<UserStore> findAll() {
		return userAdminKHService.findAll();
	}

	// Load
	@GetMapping("deleted/{deleted}")
	public List<UserStore> loadUserWithDeleted(@PathVariable("deleted") Optional<Boolean> deleted) {
		return userAdminKHService.loadUserWithDeleted(deleted.get());
	}

	// Create
	@PostMapping
	public ResponseEntity<User> create(@RequestBody Optional<UserStore> userStore) {
		if (userStore.isPresent()) {
			userAdminKHService.create(userStore.get());
		}

		return ResponseEntity.ok().build();
	}

	
	@PostMapping("checkPassworrd/{password}")
	public ResponseEntity<Boolean> changepassword(@RequestBody Optional<UserStore> userStore, @PathVariable("password") String password) {
		if (userStore.isPresent()) {
			 
			 return ResponseEntity.ok(userAdminKHService.checkPassword(userStore.get(), password));
		}

		return ResponseEntity.badRequest().build();
	}

	// Update
	@PutMapping("{id}")
	public ResponseEntity<Void> update(@PathVariable("id") Optional<String> id, @RequestBody UserStore userStore) {
		userAdminKHService.update(userStore);

		return ResponseEntity.ok().build();
	}

	// Delete
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		userAdminKHService.delete(id);
	}

	// Find by name
	@GetMapping("/{nameUser}")
	public ResponseEntity<List<UserStore>> findByName(@PathVariable("nameUser") Optional<String> nameUserStore) {
		return ResponseEntity.ok(userAdminKHService.findUserByName("%" + nameUserStore.get() + "%"));
	}

	// Find by user name
	@GetMapping("id/{nameUserName}")
	public ResponseEntity<List<UserStore>> findByUserName(@PathVariable("nameUserName") Optional<String> nameUser) {
		return ResponseEntity.ok(userAdminKHService.findUserByUserName(nameUser.get()));
	}
		
	// Find by Email
	@GetMapping("email/{nameEmail}")
	public ResponseEntity<List<UserStore>> findByEmail(@PathVariable("nameEmail") Optional<String> nameEmail) {
		return ResponseEntity.ok(userAdminKHService.findUserByEmail(nameEmail.get()));
	}

	@GetMapping("email/{nameEmail}/{id}")
	public ResponseEntity<List<UserStore>> findByEmail(@PathVariable("nameEmail") Optional<String> nameEmail,
			@PathVariable("id") Optional<Integer> id) {
		return ResponseEntity.ok(userAdminKHService.findUserByEmailForId(nameEmail.get(), id.get()));
	}
		
	// Find by Email
	@GetMapping("phone/{phone}")
	public ResponseEntity<List<UserStore>> findByPhone(@PathVariable("phone") Optional<String> phone) {
		return ResponseEntity.ok(userAdminKHService.findUserByPhone(phone.get()));
	}
	@GetMapping("phone/{phone}/{id}")
	public ResponseEntity<List<UserStore>> findByPhone(@PathVariable("phone") Optional<String> phone,
			@PathVariable("id") Optional<Integer> id) {
		return ResponseEntity.ok(userAdminKHService.findUserByPhoneForId(phone.get(), id.get()));
	}

	// Sort A-Z
	@GetMapping("/sort/a-z")
	public List<UserStore> sortAZ() {
		return userAdminKHService.sortAZ();
	}

	// Sort A-Z
	@GetMapping("/sort/z-a")
	public List<UserStore> sortZA() {
		return userAdminKHService.sortZA();
	}

	// Sort A-Z
	@GetMapping("/sort/0-9")
	public List<UserStore> sort09() {
		return userAdminKHService.hoatDong();
	}

	// Sort A-Z
	@GetMapping("/sort/9-0")
	public List<UserStore> sort90() {
		return userAdminKHService.ngungHoatDong();
	}
}
