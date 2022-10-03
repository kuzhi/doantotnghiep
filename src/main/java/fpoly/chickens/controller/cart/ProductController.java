package fpoly.chickens.controller.cart;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home/product/")
public class ProductController {
	@RequestMapping("detail")
	public String viewProductDetail() {
		return "home/product-detail";
	}
}
