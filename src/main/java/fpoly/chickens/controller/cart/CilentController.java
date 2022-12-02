package fpoly.chickens.controller.cart;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import fpoly.chickens.api.UserAdminKHAPI;
import fpoly.chickens.entity.Product;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.OrderService;
import fpoly.chickens.service.ProductService;
import fpoly.chickens.service.SessionService;
import fpoly.chickens.service.StoreService;
import fpoly.chickens.service.UserAdminKHService;
import fpoly.chickens.service.UserAdminService;
import fpoly.chickens.service.UserService;

@Controller
@RequestMapping({ "/home/client", "/home/cart/menu" })
public class CilentController {
	
	@Autowired OrderService orderService;
	@Autowired ProductService productService;
	@Autowired UserService userService;
	@Autowired HttpServletRequest req;
	@Autowired SessionService sessionServ;
	@Autowired StoreService storeServ;
	@Autowired UserAdminKHService userStoreServ;
	@Autowired UserAdminService userServ;
	@Autowired BCryptPasswordEncoder  pe;

	@RequestMapping("/{storeid}")
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

	@RequestMapping("/my-profile/{storeid}/change-password")
	public String getChangePassword(@PathVariable("storeid") String storeid) {
		

		return "home/account/change";
	}

	@RequestMapping("/_seeorder-detail/{id}")
	public String view_OrderDetail(@PathVariable("id") Optional<Integer> id, Model model) {
		model.addAttribute("detail", orderService.findOrderById(id.get()));
		return "home/_order-detail";
	}

	@PostMapping("/my-profile/change-password")
		public String changePassword(Model model) {
		String userId = userService.getTokenUser();
		System.out.println(userId);
		User user = userServ.findByUserId(Integer.parseInt(userId));

		String oldPassword = req.getParameter("oldPassword");
		String newPassword = req.getParameter("newPassword");
		String checkPassword = req.getParameter("checkNewPassword");
		boolean checkOldPassword = pe.matches(oldPassword, user.getPassword());
		if(!checkOldPassword){
			model.addAttribute("message", "Không đúng mật khẩu hiện tại");
			return "home/account/change";
		}

		if(!newPassword.equals(checkPassword)){
			model.addAttribute("message", "Mật khẩu mới và xác nhận mật khẩu không giống nhau");
			return "home/account/change";
		}

		user.setPassword(newPassword);
		userServ.update(user);
			model.addAttribute("success", "Đổi mật khẩu thành công");
			return "home/account/change";
		}
}
