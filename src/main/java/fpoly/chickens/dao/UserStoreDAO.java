package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.UserStore;


public interface UserStoreDAO extends JpaRepository<UserStore, Integer> {
	@Query("SELECT o FROM UserStore o WHERE o.Deleted = ?1")
	List<UserStore> loadUserWithDeleted(Boolean deleted);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Fullname LIKE ?1")
	List<UserStore> findByName(String name);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Username LIKE ?1")
	List<UserStore> findUserByUserName(String name);
	
	@Query(value = "SELECT o FROM UserStore o WHERE o.Username LIKE ?1 AND o.Fullname LIKE ?1")
	List<UserStore> findUserByUserNameAndFullName(String username, String fullname);
	
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
}
