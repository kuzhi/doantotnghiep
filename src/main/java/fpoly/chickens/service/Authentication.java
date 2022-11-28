package fpoly.chickens.service;

import org.springframework.ui.Model;

public interface Authentication {
	Boolean loginStore(String username, String password, Model model );
	
	Boolean loginUser(String username, String password, Model model );
}
