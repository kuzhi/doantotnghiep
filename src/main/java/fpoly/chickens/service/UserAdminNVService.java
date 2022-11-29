package fpoly.chickens.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
	// Find by ID
	Optional<UserApp> findUserByID(Integer id);
	// Find by name
	List<UserApp> findUserByName(String name);
	// Find by user
	List<UserApp> findUserByUserName(String name);

	UserApp findUsersByUserName(String name);
	// Find by email
	List<UserApp> findUserByEmail(String email);
	List<UserApp> findUserByEmailForId(String email, Integer id);
	// Find by email
	List<UserApp> findUserByPhone(String phone);
	List<UserApp> findUserByPhoneForId(String phone, Integer id);
	
	// Sort AZ
	List<UserApp> sortAZ();
	// Sort ZA
	List<UserApp> sortZA();
	// Sort 09
	List<UserApp> hoatDong();
	// Sort 90
	List<UserApp> ngungHoatDong();
}
