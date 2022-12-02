package fpoly.chickens.controller.cart;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import fpoly.chickens.entity.Product;
import fpoly.chickens.service.OrderService;
import fpoly.chickens.service.ProductService;
import fpoly.chickens.service.UserService;

@Controller
@RequestMapping({ "/home/client", "/home/cart/menu" })
public class CilentController {

	@Autowired
	OrderService orderService;
	@Autowired
	ProductService productService;
	@Autowired
	UserService userService;

	@RequestMapping
	public String view_Cart(Model model) {
		if (userService.getTokenStore() == null) {
			return "home/list_store";
		} else {
			String storeid = userService.getTokenStore();
			model.addAttribute("storeid", storeid);

			return "redirect:/home/client/list-product/" + storeid;
		}
	}

	@RequestMapping("/list-store/view")
	public String view_list() {
		return "home/list_store";
	}

	@RequestMapping("/list-product/{storeid}")
	public String viewProduct() {

		return "home/index";
	}

	@RequestMapping("/my-profile/{storeid}")
	public String view_Profile(@PathVariable("storeid") Optional<Integer> storeid) {
		return "home/my-profile";
	}

	@RequestMapping("/_seeorder-detail/{id}")
	public String view_OrderDetail(@PathVariable("id") Optional<Integer> id, Model model) {
		model.addAttribute("detail", orderService.findOrderById(id.get()));
		return "home/_order-detail";
	}
}
