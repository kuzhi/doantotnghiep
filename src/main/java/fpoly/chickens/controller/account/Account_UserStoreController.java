package fpoly.chickens.controller.account;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home/auth")
public class Account_UserStoreController {

	@GetMapping("login")
	public String login() {
		return "home/account/login";
	}
	
	@PostMapping("login/store")
	public String loginStore(Model model) {
		model.addAttribute("message", "dang nhap store thanh cong!");

		return "home/account/login";
	}
	
	@PostMapping("login/user")
	public String loginUser(Model model) {
		model.addAttribute("message", "dang nhap user thanh cong!");

		return "home/account/login";
	}
	
}