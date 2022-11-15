package fpoly.chickens.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserApp;

public interface UserAdminNVService {
	// Load all product	
	List<UserApp> findAll();
	Page<UserApp> findAllPage(Pageable pageable);
	List<UserApp> loadUserWithDeleted(Boolean deleted);
	
	// Create
	UserApp create(UserApp userapp);
	// Update
	UserApp update(UserApp userapp);
	// Delete
	void delete(Integer id);
	
	// Find by name
	List<UserApp> findUserByName(String name);
	// Find by user
	List<UserApp> findUserByUserName(String name);
	// Find by name
	List<UserApp> findUserByUserNameAndFullName(String username, String fullname);
	
	// Sort AZ
	List<UserApp> sortAZ();
	// Sort ZA
	List<UserApp> sortZA();
	// Sort 09
	List<UserApp> hoatDong();
	// Sort 90
	List<UserApp> ngungHoatDong();
}
