package fpoly.chickens.api;


import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.service.SessionService;
import fpoly.chickens.service.UserService;

@CrossOrigin("*")
@RestController
public class AuthenticationAPI {
	
	@Autowired
	UserService userService;
	@Autowired SessionService sessionService;
	
	@GetMapping("/api/getStoreid")
	public ResponseEntity<String> getStoreid() {
		String  tokenStore =  userService.getTokenStore();
	    return ResponseEntity.ok(tokenStore) ;
	}
	@GetMapping("/api/getUserid")
	public ResponseEntity<String> getUserid() {
		String  tokenUser =  userService.getTokenUser();
	    return ResponseEntity.ok(tokenUser) ;
	}

	@RequestMapping(value = "/api/get", method = RequestMethod.GET, headers="Accept=*/*")
	public @ResponseBody Object showMenu(HttpSession session) {
	    String  tokenStore =  (String) session.getAttribute("tokenStore");

	    return tokenStore ;
	}

	@RequestMapping(value = "/api/getUserApp", method = RequestMethod.GET, headers="Accept=*/*")
	public @ResponseBody Object getTokenUserApp(HttpSession session) {
		String  tokenStore =  (String) sessionService.get("tokenUserApp");
		return tokenStore ;
	}

	@RequestMapping(value = "/api/storeToken", method = RequestMethod.POST, headers="Accept=*/*")
	public ResponseEntity<Void>  setTokenStore(HttpSession session, @RequestBody Optional<String> id) {
		if(id.isPresent()){
			sessionService.set("tokenStoreSelected", id.get());
			return  ResponseEntity.ok().build();
		}
		return  ResponseEntity.badRequest().build();
	}

	@RequestMapping(value = "/api/getStoreToken", method = RequestMethod.GET, headers="Accept=*/*")
	public @ResponseBody Object getStoreToken(HttpSession session) {
	    String  tokenStoreId =  (String) sessionService.get("tokenStoreSelected");
	    return tokenStoreId ;
	}
}
