package fpoly.chickens.controller.home;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import fpoly.chickens.service.UserService;

@Controller
public class ChooseStoreController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/home/choosestoreUser")
	public String ChooseStoreUser(@RequestParam("storeid") Optional<String> storeid) {
		if(storeid.get().length()>0) {
			userService.setTokenStore(storeid.get());
			//System.out.println(storeid.get());
		}
		return "redirect:/home/client/"+0;
		
	}
	
	@GetMapping("/home/choosestoreUserStore")
	public String ChooseStoreUserStore(@RequestParam("storeid") Optional<String> storeid) {
		if(storeid.get().length()>0) {
			userService.setTokenStore(storeid.get());
		}
		return "redirect:/home/client";
		
	}
	
}
