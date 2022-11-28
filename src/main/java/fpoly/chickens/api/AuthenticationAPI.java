package fpoly.chickens.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.service.UserService;

@CrossOrigin("*")
@RestController
public class AuthenticationAPI {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/api/getStoreid")
	public ResponseEntity<Integer> getStoreid() {
	    Integer  tokenStore =  userService.getTokenStore();
	    return ResponseEntity.ok(tokenStore) ;
	}
	@GetMapping("/api/getUserid")
	public ResponseEntity<Integer> getUserid() {
	    Integer  tokenUser =  userService.getTokenUser();
	    return ResponseEntity.ok(tokenUser) ;
	}
}
