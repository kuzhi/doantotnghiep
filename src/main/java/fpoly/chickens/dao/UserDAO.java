package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserApp;


public interface UserDAO extends JpaRepository<User, Integer>{
	@Query("SELECT o FROM User o WHERE o.Deleted = ?1")
	List<User> loadUserWithDeleted(Boolean deleted);
	
	@Query(value = "SELECT o FROM User o WHERE o.Fullname LIKE ?1 AND o.Deleted = 0")
	List<User> findByName(String name);
	
	@Query(value = "SELECT o FROM User o WHERE o.Username LIKE ?1")
	List<User> findUserByUserName(String name);
	
	@Query(value="SELECT o FROM User o WHERE o.Username LIKE ?1")
	 User findByUsername(String uname);
	
	
	@Query(value = "SELECT o FROM User o WHERE o.Username LIKE ?1 AND o.Fullname LIKE ?1")
	List<User> findUserByUserNameAndFullName(String username, String fullname);
	
	@Query(value = "SELECT o FROM User o WHERE o.Username = ?1 AND o.Deleted = 0")
	List<User> findUserByUsername(String name);
	
	@Query(value = "SELECT o FROM User o WHERE o.Email = ?1 AND o.Deleted = 0")
	List<User> findUserByEmail(String email);
	
	@Query(value = "SELECT o FROM User o WHERE o.Phone = ?1 AND o.Deleted = 0")
	List<User> findUserByPhone(String phone);
	
	// Sort A-Z
	@Query(value = "SELECT o FROM User o ORDER BY o.Fullname ASC")
	List<User> sortAZ();

	// Sort A-Z
	@Query(value = "SELECT o FROM User o ORDER BY o.Fullname DESC")
	List<User> sortZA();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM User o WHERE o.Status = true")
	List<User> hoatDong();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM User o WHERE o.Status = false")
	List<User> ngungHoatDong();
}
