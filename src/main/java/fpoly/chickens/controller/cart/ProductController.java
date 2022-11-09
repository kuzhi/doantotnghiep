package fpoly.chickens.controller.cart;

import java.io.Console;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import fpoly.chickens.entity.Product;
import fpoly.chickens.service.ProductService;

@Controller
@RequestMapping("/home/product/")
public class ProductController {
	@Autowired ProductService productService;
	
	@RequestMapping("detail")
	public String viewProductDetail() {
		return "home/product-detail";
	}
}
