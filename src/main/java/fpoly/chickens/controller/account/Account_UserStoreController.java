package fpoly.chickens.controller.account;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import fpoly.chickens.service.Authentication;
import fpoly.chickens.service.SessionService;
import fpoly.chickens.service.UserService;


@Controller
@RequestMapping("/home/auth")
public class Account_UserStoreController {
	@Autowired
	UserService userService;

	@Autowired
	SessionService sessionService;
	
	@Autowired
	HttpServletRequest req;
	
	@Autowired
	Authentication authen;
	
	@GetMapping("form")
	public String login() {

		
		String checkSessionStore = userService.getTokenStore();
		String checkSessionUser = userService.getTokenUser();

		if(checkSessionStore == null){
			return "redirect:/app";
		}
		else if(checkSessionUser == null){
			return "redirect:/home/client/0";
		}
		else{
			return "home/account/login";
		}
		//return "home/account/login";
	}
	@RequestMapping("login")
	public String logoutErro(Model model, @RequestParam("error") String error){
		if(error.equalsIgnoreCase("Not Logged In")){
			error = "Chưa đăng nhập";
		}else if(error.equalsIgnoreCase("Access is denied")){
			error = "Bạn không có quyền truy cập";
		}
		model.addAttribute("message", error);
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
	
	@RequestMapping("logout-store")
	public String logoutStore(){
		sessionService.remove("tokenStore");
		System.out.println(userService.getTokenStore());
		return "redirect:/home/auth/form";
	}

	@RequestMapping("logout-user")
	public String logoutUser(){
		sessionService.remove("tokenUser");
		return "redirect:/home/auth/form";
	}
}