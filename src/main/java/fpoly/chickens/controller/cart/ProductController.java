package fpoly.chickens.controller.cart;

import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import fpoly.chickens.entity.Product;
import fpoly.chickens.service.CategoryService;
import fpoly.chickens.service.ProductService;

@Controller
@RequestMapping("/home/product/")
public class ProductController {
	@Autowired
	ProductService ProductService;

	@Autowired
	CategoryService CategoryService;

	@RequestMapping("detail")
	public String viewProductDetail(Model model, @PathParam("id") Optional<Integer> id) {
		if (id.isPresent()) {
			Integer ProductId = id.get();
			Product sp = ProductService.findById(ProductId);

			model.addAttribute("product", sp);
		} else {
			System.out.println("Sản phẩm không tìm thấy");
		}

		return "home/product-detail";
	}
}
