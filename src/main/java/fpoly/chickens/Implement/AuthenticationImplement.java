package fpoly.chickens.Implement;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
	BCryptPasswordEncoder pe;
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
	public String loginStore(String username, String password) {
		// TODO Auto-generated method stub
		
		UserStore userStore = userStoreDao.findByUsername(username);
		
		
		
		if(userStore != null) {
			String passwordStore = userStore.getPassword().trim();
			boolean match = pe.matches(password, passwordStore);
			Store store = storeDao.findByUserid(userStore.getId());
			Date today = new Date();
			boolean matchDate = today.after(store.getEnddate());
			
			if(match){
				if(matchDate == false){
					if(store.getDeleted() == false){
						if(userStore.getDeleted()==false  ) {
							Integer userStoreId = userStore.getId();
							userService.setTokenStore(userStoreId);
								return "loginsuccess";
						}
						return "accountdeleted";	
					}
					
					return "storedeleted";

				}
				return "equalenddate";				
			
			}
			return "wrongaccountorpass";
			
		}
		return "storenotexited";
	}
	
	
	@Override
	public Boolean loginUser(String username, String password) {
		// TODO Auto-generated method stub
			User users = userDao.findByUsername(username);
		
		if(users != null) {
			String passwordUsers = users.getPassword().trim();
			boolean match = pe.matches(password, passwordUsers);
			if(match){
				if(!users.getDeleted()) {
					Integer userId = users.getId();

					userService.setTokenUser(userId);
					return true;
						
					
				}		return false;		
			}return false;
	
		}
		return false;
	}
}
