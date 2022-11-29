package fpoly.chickens.controller.account;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import fpoly.chickens.service.Authentication;

import fpoly.chickens.service.UserService;


@Controller
@RequestMapping("/home/auth")
public class Account_UserStoreController {
	@Autowired
	UserService userService;

	
	@Autowired
	HttpServletRequest req;
	
	@Autowired
	Authentication authen;
	
	@GetMapping("form")
	public String login() {
		
		return "home/account/login";
	}
	

	@PostMapping("login/store")
	public String loginStore(Model model) {
		
		String username= req.getParameter("username");
		String password= req.getParameter("password");
		boolean Check = authen.loginStore(username, password);
		
		if(Check) {
					 return "redirect:/app";
		}
		model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản chưa được đăng ký!");
		return "home/account/login";
	}
	
	@PostMapping("login/user")
	public String loginUser(Model model) {
		
		String username= req.getParameter("username");
		String password= req.getParameter("password");
		boolean Check = authen.loginUser(username, password);
		if(Check) {

			return "redirect:/home/client/"+0;


		}
		model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản chưa được đăng ký!");
		return "home/account/login";
	}
	
	
}