package fpoly.chickens.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService extends UserDetailsService {

	@Override
	default UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	// void setToken(String username, String password);

	String getTokenStore();

	String getTokenUser();


		void setTokenStore(Integer userStoreId);

		 
		void setTokenUser(Integer userId);

<<<<<<< HEAD
		void setTokenStore(Integer userStoreId);

		void setTokenUser(Integer userId);

		void setTokenUser(String userId);
=======
void setTokenUser(String userId);

>>>>>>> 242a2bc3c6643f2494ff010adb6694fa743e7158

}
