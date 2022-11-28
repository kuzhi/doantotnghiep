package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.UserStore;


public interface UserStoreDAO extends JpaRepository<UserStore, Integer> {


	@Query("SELECT o FROM UserStore o WHERE o.Deleted = ?1")
	List<UserStore> loadUserWithDeleted(Boolean deleted);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Fullname LIKE ?1 AND o.Deleted = 0")
	List<UserStore> findByName(String name);

	@Query(value = "SELECT o FROM UserStore o WHERE o.Username = ?1 AND o.Deleted = 0")
	List<UserStore> findUserByUserName(String name);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Username = ?1 AND o.Deleted = 0")
	UserStore loadUserStoreByUserName(String name);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Email = ?1 AND o.Deleted = 0")
	List<UserStore> findUserByEmail(String email);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Email = ?1 AND o.Deleted = 0 AND o.Id = ?2 ")
	List<UserStore> findUserByEmailForId(String email, Integer id);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Phone = ?1 AND o.Deleted = 0")
	List<UserStore> findUserByPhone(String phone);

	@Query(value = "SELECT o FROM UserStore o WHERE o.Phone = ?1 AND o.Deleted = 0 AND o.Id = ?2 ")
	List<UserStore> findUserByPhoneForId(String phone, Integer id);
	
	// Sort A-Z
	@Query(value = "SELECT o FROM UserStore o WHERE o.Deleted = 0 ORDER BY o.Fullname ASC")
	List<UserStore> sortAZ();

	// Sort A-Z
	@Query(value = "SELECT o FROM UserStore o WHERE o.Deleted = 0 ORDER BY o.Fullname DESC")
	List<UserStore> sortZA();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM UserStore o WHERE o.Status = true AND o.Deleted = 0")
	List<UserStore> hoatDong();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM UserStore o WHERE o.Status = false AND o.Deleted = 0")
	List<UserStore> ngungHoatDong();

	
	@Query(value="SELECT * FROM UserStore WHERE username = ?1", nativeQuery = true)
	 UserStore findByUsername(String uname);



}

