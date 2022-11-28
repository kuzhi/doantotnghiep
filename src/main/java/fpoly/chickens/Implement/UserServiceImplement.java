package fpoly.chickens.Implement;

import java.util.Base64;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserDAO;
import fpoly.chickens.dao.UserRoleAppDAO;
import fpoly.chickens.dao.UserStoreDAO;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.SessionService;
import fpoly.chickens.service.UserService;

@SessionScope
@Service
public class UserServiceImplement implements UserService {
	@Autowired
	HttpSession session;
	@Autowired
	StoreDAO StoreDao;
	@Autowired
	UserAppDAO userAppDao;
	
	@Autowired
	UserDAO userDao;
	
	
	@Autowired
	UserStoreDAO userStoreDao;
	
	
	
	@Autowired
	UserRoleAppDAO userRoleDao;
	
	@Autowired
	BCryptPasswordEncoder pe;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
try {
			
			//UserApp userApp = userAppDao.findByUsernames(username); 

			UserStore userStore = userStoreDao.findByUsername(username);
			
			String passwordStore = userStore.getPassword();
			System.out.println(userStore);
			List<Store> store = StoreDao.findByUserStore(userStore.getId());
			String adminStore = "ADMINSTORE";
			if(store.size() == 0) {
				 adminStore = null;
				
			}
			System.out.println(store.size());
			//this.setToken(username, passwordStore);
			return User.withUsername(username)
					.password(pe.encode(passwordStore)).build();
					//.roles("ADMINSTORE").build();// luôn phải mã hóa mật khẩu 
		} catch (Exception e) {
			// TODO: handle exception
//			fpoly.chickens.entity.User users = userDao.findByUsername(username);
//			String passwordUser = users.getPassword();
//			return User.withUsername(username)
//					.password(pe.encode(passwordUser))
//					.build();
			throw new UsernameNotFoundException(username + " not found");
		} 
	}

	

	@Override
	public void setTokenStore(Integer userStoreId) {
		// TODO Auto-generated method stub
		//byte[] auth = (userStoreId).getBytes();
		//String token = "Basic " + Base64.getEncoder().encodeToString(auth);
		session.setAttribute("tokenStore", userStoreId);

	}
	
	
	@Override
	public void setTokenUser(Integer userId) {
		// TODO Auto-generated method stub
		//byte[] auth = (userId).getBytes();
		//String token = "Basic " + Base64.getEncoder().encodeToString(auth);
		session.setAttribute("tokenUser", userId);

	}
	
	@Override
	public Integer getTokenStore() {
		// TODO Auto-generated method stub
		Integer token = (Integer) session.getAttribute("tokenStore");
		return token;

	}

	@Override
	public Integer getTokenUser() {
		// TODO Auto-generated method stub

		
		Integer token = (Integer) session.getAttribute("tokenUser");
		return token;

	}

}
