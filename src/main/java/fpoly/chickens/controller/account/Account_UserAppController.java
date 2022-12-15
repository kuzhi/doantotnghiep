package fpoly.chickens.controller.account;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserRoleAppDAO;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserRoleApp;
import fpoly.chickens.service.SessionService;
import fpoly.chickens.service.UserService;

@Controller
public class Account_UserAppController {


	

	@Autowired
	UserAppDAO userAppDao;

	@Autowired
	UserRoleAppDAO userRoleDao;

	@Autowired
	SessionService sessionService;

	@Autowired
	UserService userService;

	@GetMapping("/user-app/auth/form")
	public String login() {
		String checkSessionUserApp = userService.getTokenUserApp();
		if(checkSessionUserApp !=null){
			return "redirect:/admin";
		}

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



	@RequestMapping("/user-app/logoff")
	public void logout(){
		sessionService.invalidate();

	}

	// @GetMapping("/user-app/access/denied")
	// public String errorStore(Model model) {
	// 	sessionService.remove("tokenUserApp");
	// 	model.addAttribute("message", "Bạn không có quyền");

	// 	return "home/account/loginApp";
	// }
	
}
