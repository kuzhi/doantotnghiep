package fpoly.chickens.controller.cart;

import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping({"/home/client", "/home/cart/menu"})
public class CilentController {
	@RequestMapping()
	public String view_Cart() {
		return "home/index";
	}
	
	@RequestMapping("/my-profile")
	public String view_Profile() {
		return "home/my-profile";
	}
	
	@RequestMapping("/_order-detail")
	public String view_OrderDetail() {
		return "home/_order-detail";
	}
}
