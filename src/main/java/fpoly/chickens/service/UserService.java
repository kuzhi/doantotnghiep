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

<<<<<<< HEAD
		void setTokenStore(String userStoreId);
=======

		void setTokenStore(int userStoreId, int storeId);
>>>>>>> 6e56a26e177a80f403fd4fe488d277b1abc72a0b
		 
		void setTokenUser(String userId);

}
