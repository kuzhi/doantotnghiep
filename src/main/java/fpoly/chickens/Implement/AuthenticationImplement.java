package fpoly.chickens.Implement;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.dao.UserDAO;
import fpoly.chickens.dao.UserStoreDAO;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.Authentication;
import fpoly.chickens.service.UserService;

@Service
public class AuthenticationImplement implements Authentication{
	
	@Autowired
	UserStoreDAO userStoreDao;
	@Autowired
	HttpSession session;
	@Autowired
	StoreDAO storeDao;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserDAO userDao;
	
	@Override
	public Boolean loginStore(String username, String password, Model model) {
		// TODO Auto-generated method stub
		System.out.println("a");
		UserStore userStore = userStoreDao.findByUsername(username);
		
		
		
		if(userStore != null) {
			String passwordStore = userStore.getPassword();
			List<Store> store = storeDao.findByUserStore(userStore.getId());
//			String adminStore = "ADMINSTORE";
//			if(store.size() == 0) {
//				 adminStore = null;
//				
//			}
			
			
			if(password.equals(userStore.getPassword().trim())){
				if(!userStore.getDeleted()) {
					userService.setTokenStore(userStore.getId(), store.get(0).getId());
						return true;
				}
			
				else {
					model.addAttribute("message", "Store  này đã bị xóa");
				}
			}
			else {
				model.addAttribute("message", "Sai mật khẩu");

			}
			
			
		}
		return false;
	}
	
	
	@Override
	public Boolean loginUser(String username, String password, Model model) {
		// TODO Auto-generated method stub
			User users = userDao.findByUsername(username);
		
		if(users != null) {
			//List<Store> store = storeDao.findByUserStore(userStore.getId());
//			String adminStore = "ADMINSTORE";
//			if(store.size() == 0) {
//				 adminStore = null;
//				
//			}
			
			if(password.equals(users.getPassword().trim())){
				if(!users.getDeleted()) {
					userService.setTokenUser(users.getId() );
					return true;
						//return "redirect:/home/client";
					
				}
			
				else {
					model.addAttribute("error", "Store  này đã bị xóa");
				}
			}
			else {
				model.addAttribute("errorPass", "Sai mật khẩu");

			}
			
			
		}
		return false;
	}
}
