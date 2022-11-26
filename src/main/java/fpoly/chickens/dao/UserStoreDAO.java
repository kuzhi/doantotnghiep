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
	
	@Query(value = "SELECT COUNT(Username) FROM UserStore o WHERE o.Username = ?1 ")
	UserStore loadUserStoreByUserName(String name);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Email = ?1 AND o.Deleted = 0")
	List<UserStore> findUserByEmail(String email);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Phone = ?1 AND o.Deleted = 0")
	List<UserStore> findUserByPhone(String phone);
	
	// Sort A-Z
	@Query(value = "SELECT o FROM UserStore o ORDER BY o.Fullname ASC")
	List<UserStore> sortAZ();

	// Sort A-Z
	@Query(value = "SELECT o FROM UserStore o ORDER BY o.Fullname DESC")
	List<UserStore> sortZA();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM UserStore o WHERE o.Status = true")
	List<UserStore> hoatDong();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM UserStore o WHERE o.Status = false")
	List<UserStore> ngungHoatDong();

	
	@Query(value="SELECT * FROM UserStore WHERE username = ?1", nativeQuery = true)
	 UserStore findByUsername(String uname);



}

