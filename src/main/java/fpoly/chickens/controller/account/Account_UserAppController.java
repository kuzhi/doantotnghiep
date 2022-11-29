package fpoly.chickens.controller.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserRoleAppDAO;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserRoleApp;

@Controller

public class Account_UserAppController {

	@Autowired
	UserAppDAO userAppDao;

	@Autowired
	UserRoleAppDAO userRoleDao;

	@RequestMapping("/user-app/auth/form")
	public String login() {
			
		return "home/account/loginApp";
	}
	
	@GetMapping("/user-app/auth/error")
	public String loginStore(Model model) {
		model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản chưa được đăng ký!");

		return "home/account/loginApp";
	}
	
	@GetMapping("/user-app/auth/success")
	public String loginUser(Model model) {
		

		return "redirect:/admin";
	}


	
}
