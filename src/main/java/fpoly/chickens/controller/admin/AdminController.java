package fpoly.chickens.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/admin", "/admin/management"})
public class AdminController {
	@RequestMapping()
	public String view_Admin() {
		return "redirect:/assets/admin/layout_admin.html";
	}
	
}
