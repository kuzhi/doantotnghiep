package fpoly.chickens.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fpoly.chickens.entity.User;

public interface UserAdminService {
	// Load all product	
	List<User> findAll();
	Page<User> findAllPage(Pageable pageable);
	List<User> loadUserWithDeleted(Boolean deleted);
	
	// Create
	User create(User user);
	// Update
	User update(User user);
	// Delete
	void delete(Integer id);
	
	// Find by name
	List<User> findUserByName(String name);
	// Find by user
	List<User> findUserByUserName(String name);
	// Find by name
	List<User> findUserByUserNameAndFullName(String username, String fullname);
	
	// Sort AZ
	List<User> sortAZ();
	// Sort ZA
	List<User> sortZA();
	// Sort 09
	List<User> hoatDong();
	// Sort 90
	List<User> ngungHoatDong();
}
