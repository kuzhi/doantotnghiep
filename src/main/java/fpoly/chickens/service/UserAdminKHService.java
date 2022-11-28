package fpoly.chickens.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserStore;

public interface UserAdminKHService {
	// Load all product	
	List<UserStore> findAll();
	Page<UserStore> findAllPage(Pageable pageable);
	List<UserStore> loadUserWithDeleted(Boolean deleted);
	
	// Create
	UserStore create(UserStore userStore);
	// Update
	UserStore update(UserStore userStore);
	// Delete
	void delete(Integer id);
	
	// Find by name
	List<UserStore> findUserByName(String name);
	// Find by user
	List<UserStore> findUserByUserName(String name);
	// Find by email
	List<UserStore> findUserByEmail(String email);
	List<UserStore> findUserByEmailForId(String email, Integer id);
	// Find by phone
	List<UserStore> findUserByPhone(String phone);
	List<UserStore> findUserByPhoneForId(String phone, Integer id);
	
	// Sort AZ
	List<UserStore> sortAZ();
	// Sort ZA
	List<UserStore> sortZA();
	// Sort 09
	List<UserStore> hoatDong();
	// Sort 90
	List<UserStore> ngungHoatDong();
}
