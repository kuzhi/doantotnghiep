package fpoly.chickens.Implement;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

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

import fpoly.chickens.dao.RoleAppDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserDAO;
import fpoly.chickens.dao.UserRoleAppDAO;
import fpoly.chickens.dao.UserStoreDAO;
import fpoly.chickens.entity.RoleApp;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.UserService;

@SessionScope
@Service
public class UserServiceImplement implements UserService {
	@Autowired
	HttpSession session;
	
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

				String passwordApp = userApp.getPassword();
				System.out.println("?"+ userApp + " "+ passwordApp);
				int roleId = userRoleDao.findUserRoleIDByUsername(username);
				if(roleId <=0){
					System.out.println("?"+ userApp + " "+ roleId);

				}
				
				RoleApp role =   roleDao.findById(roleId).get();
				System.out.println("?"+ userApp + " "+ role);
				String roleUser = role.getRoleName();
				System.out.println("?"+ userApp + " "+ roleUser);
			return User.withUsername(username)
			 			.password(pe.encode(passwordApp)).roles(roleUser).build();
			
		} catch (Exception e) {
			// TODO: handle exception
			throw new UsernameNotFoundException(username + " not found");
		} 
	}

	

	@Override
	public void setTokenStore(String userStoreId) {
		// TODO Auto-generated method stub
		//byte[] auth = (userStoreId).getBytes();
		//String token = "Basic " + Base64.getEncoder().encodeToString(auth);
		session.setAttribute("tokenStore", userStoreId);


	}
	
	
	@Override
	public void setTokenUser(String userId) {
		// TODO Auto-generated method stub
		//byte[] auth = (userId).getBytes();
		//String token = "Basic " + Base64.getEncoder().encodeToString(auth);
		session.setAttribute("tokenUser", userId);

	}
	
	@Override
	public String getTokenStore() {
		// TODO Auto-generated method stub
		String token = (String) session.getAttribute("tokenStore");
		String getSubstring = token.substring(6);
		byte[] decodedBytes = Base64.getDecoder().decode(getSubstring);
		String decodedString = new String(decodedBytes);
		return decodedString;


	}

	@Override
	public String getTokenUser() {
		// TODO Auto-generated method stub

		
		String token = (String) session.getAttribute("tokenUser");
		String getSubstring = token.substring(6);
		byte[] decodedBytes = Base64.getDecoder().decode(getSubstring);
		String decodedString = new String(decodedBytes);
		return decodedString;
		 


	}

}
