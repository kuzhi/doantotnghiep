package fpoly.chickens.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import fpoly.chickens.entity.User;

public interface  UserService extends UserDetailsService{

	
		@Override
		default UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
			// TODO Auto-generated method stub
			return null;
		}

		
		 //void setToken(String username, String password);
		 
		 String getTokenStore();
		 String getTokenUser();


		void setTokenStore(int userStoreId, int storeId);
		 
		void setTokenUser(int userId);

}
