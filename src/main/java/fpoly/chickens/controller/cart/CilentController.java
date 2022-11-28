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
	
	@Autowired OrderService orderService;
	@Autowired ProductService productService;
	@Autowired UserService userService;
	
	@RequestMapping()
	public String view_Cart() {
		if(userService.getTokenStore()==null) {
			return "home/list_store";
		}else {
			return "home/index";
		}
	}
	
	@RequestMapping("/list-product")
	public String viewProduct(Model model, @RequestParam("storeid") Optional<Integer> storeid) {
		List<Product> list = productService.findAllProductByStore(3, true);
		System.out.println("data: "+list);
		
		model.addAttribute("products", list);
		Pageable pageable = PageRequest.of(0, 8);
		
		Page<Product> page = productService.findAllPage(pageable);
		model.addAttribute("page", page);
		
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
}
