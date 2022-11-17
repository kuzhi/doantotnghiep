package fpoly.chickens.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import fpoly.chickens.entity.User;

public interface  UserService extends UserDetailsService{

	
		@Override
		default UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
			// TODO Auto-generated method stub
			return null;
		}
		
		 void loginFromOAuth2(OAuth2AuthenticationToken oauth2);
		
		 void setToken(String username, String password);
		 
		 String getToken();
		 
	

}
