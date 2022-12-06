package fpoly.chickens.service;

import org.springframework.ui.Model;

public interface Authentication {
	String loginStore(String username, String password );
	
	Boolean loginUser(String username, String password );
}
