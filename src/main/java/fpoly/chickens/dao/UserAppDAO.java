package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserApp;


public interface UserAppDAO extends JpaRepository<UserApp, Integer>{
	@Query("SELECT o FROM UserApp o WHERE o.Deleted = ?1")
	List<UserApp> loadUserWithDeleted(Boolean deleted);
	
	@Query(value="SELECT * FROM UserApp WHERE username = ?1", nativeQuery = true)
	public UserApp findByUsername(String uname);
	
	@Query(value = "SELECT o FROM UserApp o WHERE o.Fullname LIKE ?1")
	List<UserApp> findByName(String name);
	
	@Query(value = "SELECT o FROM UserApp o WHERE o.Username LIKE ?1")
	List<UserApp> findUserByUserName(String name);
	
	@Query(value = "SELECT o FROM UserApp o WHERE o.Username LIKE ?1 AND o.Fullname LIKE ?1")
	List<UserApp> findUserByUserNameAndFullName(String username, String fullname);
	
	// Sort A-Z
		@Query(value = "SELECT o FROM UserApp o ORDER BY o.Fullname ASC")
		List<UserApp> sortAZ();

		// Sort A-Z
		@Query(value = "SELECT o FROM UserApp o ORDER BY o.Fullname DESC")
		List<UserApp> sortZA();
		
		// Sort A-Z
		@Query(value = "SELECT o FROM UserApp o WHERE o.Gender = true")
		List<UserApp> hoatDong();
		
		// Sort A-Z
		@Query(value = "SELECT o FROM UserApp o WHERE o.Gender = false")
		List<UserApp> ngungHoatDong();
}
