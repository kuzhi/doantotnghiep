package fpoly.chickens.controller.user_store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import fpoly.chickens.service.SessionService;
import fpoly.chickens.service.UserService;

@Controller
@RequestMapping({"/app", "/app/sales-method"})
public class AppController {
	
	@Autowired
	SessionService sessionService;

	@Autowired
	UserService userService;

	@RequestMapping()
	public String view_App() {
		String checkSessionStore = userService.getTokenStore();
		if(checkSessionStore !=null){
			return "redirect:/assets/user_store/layout_user-store.html";

		}
		return "redirect:home/auth/form";
	}
	
}
