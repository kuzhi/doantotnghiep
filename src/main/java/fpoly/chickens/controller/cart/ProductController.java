package fpoly.chickens.controller.cart;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
	public String viewProductDetail(Model model,
			@PathParam("id") Optional<Integer> id,
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("size") Optional<Integer> size) {
		if (id.isPresent()) {
			// lấy chi tiết sản phẩm
			Integer ProductId = id.get();
			Product sp = ProductService.findById(ProductId);
			model.addAttribute("product", sp);

			// lấy id loại hàng của sản phẩm
			Integer categoryId = ProductService.findByCategory(ProductId);

			// lấy danh sách loại hàng dựa vào id
			List<Product> products = new ArrayList<>();
			products = ProductService.sortCategory(categoryId);

			int currentPage = page.orElse(1);
			int pageSize = size.orElse(4);
			Page<Product> bookPage = ProductService.findAllPage(PageRequest.of(currentPage - 1, pageSize));
			model.addAttribute("cateProduct", bookPage);

		} else {
			System.out.println("Sản phẩm không tìm thấy");
		}

		return "home/product-detail";
	}

	@PostMapping("ViewAlldetail")
	public String viewAllProductDetail(Model model,

			@RequestParam("page") Optional<Integer> page,
			@RequestParam("size") Optional<Integer> size) {
		Product sp = ProductService.findById(79);
		model.addAttribute("product", sp);
		List<Product> productss = ProductService.findAll();
		model.addAttribute("cateProduct", productss);

		return "/home/product-detail";
	}
}
