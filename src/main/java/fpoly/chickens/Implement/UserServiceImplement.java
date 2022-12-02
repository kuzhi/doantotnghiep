package fpoly.chickens.Implement;

import java.io.Console;
import java.util.Base64;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.RoleAppDAO;
import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserRoleAppDAO;
import fpoly.chickens.entity.RoleApp;
import fpoly.chickens.entity.UserApp;

import fpoly.chickens.entity.UserRoleApp;


import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.SessionService;
import fpoly.chickens.service.UserService;

@SessionScope
@Service
public class UserServiceImplement implements UserService {
	@Autowired
	HttpSession session;

	@Autowired
	HttpServletRequest req;

	@Autowired
	UserAppDAO userAppDao;
	
	@Autowired
	RoleAppDAO roleDao;
	@Autowired
	UserRoleAppDAO userRoleDao;
	
	@Autowired
	BCryptPasswordEncoder pe;


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			
					UserApp userApp = userAppDao.findByUsernames(username); 
					//this.setToken(userApp.getId());
						String passwordApp = userApp.getPassword().trim();
						System.out.println(userApp + passwordApp);
			
						String[] role = userRoleDao.findUserRoleIDByUsername(userApp.getId()).toArray(new String[0]);
						
						
						this.setTokenUserApp(String.valueOf(userApp.getId()));
						
					return User.withUsername(username)
								 .password(passwordApp).roles(role).build();
					
				} catch (Exception e) {
					// TODO: handle exception
					throw new UsernameNotFoundException(username + " not found");
				} 
			}
		

	@Override

	public void setTokenStore(Integer userStoreId) {
		// TODO Auto-generated method stub
		// byte[] auth = (userStoreId).getBytes();
		// String token = "Basic " + Base64.getEncoder().encodeToString(auth);

		String tokenStoreId = String.valueOf(userStoreId);
		session.setAttribute("tokenStore", tokenStoreId);


	}

	@Override
	public void setTokenUser(Integer userId) {
		// TODO Auto-generated method stub
		// byte[] auth = (userId).getBytes();
		// String token = "Basic " + Base64.getEncoder().encodeToString(auth);
		String tokenUserId = String.valueOf(userId);

		session.setAttribute("tokenUser", tokenUserId);

	}

	

	@Override
	public String getTokenStore() {
		// TODO Auto-generated method stub
		String token = (String) session.getAttribute("tokenStore");

		return token;
	}

	@Override
	public String getTokenUser() {
		// TODO Auto-generated method stub
		String token = (String) session.getAttribute("tokenUser");
		return token;

	}

	@Override
	public void setTokenUserApp(String userAppId) {
		// TODO Auto-generated method stub
		//byte[] auth = (userId).getBytes();
		//String token = "Basic " + Base64.getEncoder().encodeToString(auth);
		session.setAttribute("tokenUserApp", userAppId);

	}
@Override
public String getTokenUserApp() {
	// TODO Auto-generated method stub
	String token = (String) session.getAttribute("tokenUserApp");

	return token;
}

}
