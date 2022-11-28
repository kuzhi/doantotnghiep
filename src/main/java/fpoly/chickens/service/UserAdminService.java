package fpoly.chickens.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserStore;

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
	
	// Find by ID
	Optional<UserStore> findUserByID(Integer id);
	// Find by name
	List<User> findUserByName(String name);
	// Find by user
	List<User> findUserByUserName(String name);
	// Load user name
	UserStore loadUserStoreByUserName(String name);
	// Find by name
	List<User> findUserByUserNameAndFullName(String username, String fullname);
	// Find by user
	User findUserByUsername(String name);
	// Find by email
	List<User> findUserByEmail(String email);
	List<User> findUserByEmailForId(String email, Integer id);
	// Find by phone
	List<User> findUserByPhone(String phone);
	List<User> findUserByPhoneForId(String phone, Integer id);
	
	// Sort AZ
	List<User> sortAZ();
	// Sort ZA
	List<User> sortZA();
	// Sort 09
	List<User> hoatDong();
	// Sort 90
	List<User> ngungHoatDong();
}
