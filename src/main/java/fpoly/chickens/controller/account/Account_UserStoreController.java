package fpoly.chickens.controller.account;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home/login/")
public class Account_UserStoreController {

	@RequestMapping("login")
	public String login() {
		return "home/login";
	}
	

}