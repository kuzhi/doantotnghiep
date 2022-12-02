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

import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserStore;
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
	@GetMapping("getamin")
	public List<UserApp> getAdmins(@RequestParam("admin") Optional<Boolean> admin) {
		return userAdminNVService.getAdmins();
	}
	// LoadUserStore by ID
	@GetMapping("/get-user-app/{userAppID}")
	public ResponseEntity<Optional<UserApp>> LoadUserStoreByID(@PathVariable("userAppID") Optional<Integer> userAppID) {
		return ResponseEntity.ok(userAdminNVService.findUserByID(userAppID.get()));
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

	// Change
	@PostMapping("checkPassworrd/{password}")
	public ResponseEntity<Boolean> changepassword(@RequestBody Optional<UserApp> userApp, @PathVariable("password") String password) {
		if (userApp.isPresent()) {
			 
			 return ResponseEntity.ok(userAdminNVService.checkPassword(userApp.get(), password));
		}

		return ResponseEntity.badRequest().build();
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
	@GetMapping("id/{name}")
	public ResponseEntity<List<UserApp>> findByUserName(@PathVariable("name") Optional<String> name) {
		return ResponseEntity.ok(userAdminNVService.findUserByUserName(name.get()));
	}
	
	// Find by Email
	@GetMapping("email/{nameEmail}")
	public ResponseEntity<List<UserApp>> findByEmail(@PathVariable("nameEmail") Optional<String> nameEmail) {
		return ResponseEntity.ok(userAdminNVService.findUserByEmail(nameEmail.get()));
	}
	
	@GetMapping("email/{email}/{id}")
	public ResponseEntity<List<UserApp>> findByUserNameForId(@PathVariable("email") Optional<String> email,
			@PathVariable("id") Optional<Integer> id) {
		return ResponseEntity.ok(userAdminNVService.findUserByEmailForId(email.get(), id.get()));
	}
	
	// Find by Phone
	@GetMapping("phone/{phone}")
	public ResponseEntity<List<UserApp>> findByPhone(@PathVariable("phone") Optional<String> phone) {
		return ResponseEntity.ok(userAdminNVService.findUserByPhone(phone.get()));
	}
	
	@GetMapping("phone/{phone}/{id}")
	public ResponseEntity<List<UserApp>> findByPhoneForId(@PathVariable("phone") Optional<String> phone,
			@PathVariable("id") Optional<Integer> id) {
		return ResponseEntity.ok(userAdminNVService.findUserByPhoneForId(phone.get(), id.get()));
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
