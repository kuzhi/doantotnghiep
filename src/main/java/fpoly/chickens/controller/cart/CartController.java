package fpoly.chickens.controller.cart;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/cart", "/cart/menu"})
public class CartController {
	@RequestMapping()
	public String view_Cart() {
		return "redirect:/assets/cart/index.html";
	}
}
