package fpoly.chickens.controller.account;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class Account_UserAppController {

	@RequestMapping("/user-app/auth/form")
	public String login() {
		return "home/account/loginApp";
	}
	
	@GetMapping("/user-app/auth/error")
	public String loginStore(Model model) {
		model.addAttribute("message", "sai tai khoan hoac mat khau hoac tai khoan khong co trong he thong!");

		return "home/account/loginApp";
	}
	
	@GetMapping("/user-app/auth/success")
	public String loginUser(Model model) {
		

		return "redirect:/admin";
	}
}
