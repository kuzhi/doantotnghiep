package fpoly.chickens.controller.cart;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home/cart/")
public class CartController {
	@RequestMapping("view")
	public String viewCart() {
		return "home/cart";
	}
}
