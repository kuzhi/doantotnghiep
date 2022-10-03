package fpoly.chickens.controller.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/home", "/home/chickens-gangs"})
public class HomeController {
	@RequestMapping()
	public String view_App() {
		return "redirect:/assets/home/index_main.html";
	}
	
}
