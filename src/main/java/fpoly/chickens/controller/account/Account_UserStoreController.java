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
		System.out.println(checkSessionStore + " "+ checkSessionUser);
		if(checkSessionUser != null ){
			return "redirect:/home/client";

		}
		if(checkSessionStore != null ){
			return "redirect:/app";
		}
			return "home/account/login";
		
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
	
		String Check = authen.loginStore(username, password);

		
		if(!Check.equalsIgnoreCase("storenotexited")){
			if(!Check.equalsIgnoreCase("wrongaccountorpass")){
				if(!Check.equalsIgnoreCase("equalenddate")){
					if(!Check.equalsIgnoreCase("storedeleted")){
						if(!Check.equalsIgnoreCase("accountdeleted")){
							if(Check.equalsIgnoreCase("loginsuccess")) {
							return "redirect:/app";
						   }

						}
						model.addAttribute("messageS", "Tài khoản đã bị xóa!");
						return "home/account/login";

					}
					model.addAttribute("messageS", "Cửa hàng của bạn tạm ngưng hoạt động vui lòng liên hệ đến công ty để hỗ trợ!");
					return "home/account/login";
					
				}
				model.addAttribute("messageS", "Cửa hàng của tài khoản này đã hết hạn sử dụng vui lòng liên hệ đến công ty để gia hạn thêm!");
				return "home/account/login";

			}
			model.addAttribute("messageS", "Sai tài khoản, mật khẩu hoặc tài khoản chưa được đăng ký!");
			return "home/account/login";

		}
		model.addAttribute("messageS", "Sai tài khoản, mật khẩu hoặc tài khoản chưa được đăng ký!");
		return "home/account/login";
	}
	
	@PostMapping("login/user")
	public String loginUser(Model model) {
		
		String username= req.getParameter("username");
		String password= req.getParameter("password");
		boolean Check = authen.loginUser(username, password);
		if(Check) {
			return "redirect:/home/client";
		}
		model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản chưa được đăng ký!");
		return "home/account/login";
	}
	
	@GetMapping("logout-store")
	public String logoutStore(){
		sessionService.invalidate();
	
		return "home/account/login";
	}

	@GetMapping("logout-user")
	public String logoutUser(){
		sessionService.invalidate();
		
		return "home/account/login";
	}
}