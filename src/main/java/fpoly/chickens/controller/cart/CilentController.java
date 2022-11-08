package fpoly.chickens.controller.cart;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import fpoly.chickens.service.OrderService;


@Controller
@RequestMapping({ "/home/client", "/home/cart/menu" })
public class CilentController {
	
	
	@Autowired
	OrderService orderService;
	
	
	@RequestMapping()
	public String view_Cart() {
		return "home/index";
	}

	@RequestMapping("/my-profile")
	public String view_Profile() {
		return "home/my-profile";
	}

	@RequestMapping("/_order-detail/{id}")
	public String view_OrderDetail(@PathVariable("id") Optional<Integer> id, Model model) {
		model.addAttribute("detail",orderService.findOrderById(id.get()));
		return "home/_order-detail";
	}

	@RequestMapping("/list-favorite")
	public String view_ListFavorite() {
		return "home/list-favorite";
	}

}
