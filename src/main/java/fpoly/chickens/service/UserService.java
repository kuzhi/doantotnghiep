package fpoly.chickens.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import fpoly.chickens.entity.User;

public interface UserService extends UserDetailsService {

	@Override
	default UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	// void setToken(String username, String password);

	String getTokenStore();

	String getTokenUser();

	String getTokenUserApp();


	void setTokenStore(Integer userStoreId);

	void setTokenUser(Integer userId);

	void setTokenUserApp(String userAppId);
	
}
