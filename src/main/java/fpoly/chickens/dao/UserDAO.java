package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Product;
import fpoly.chickens.entity.User;


public interface UserDAO extends JpaRepository<User, Integer>{
	@Query("SELECT o FROM User o WHERE o.Deleted = ?1")
	List<User> loadUserWithDeleted(Boolean deleted);
	
	@Query(value = "SELECT o FROM User o WHERE o.Fullname LIKE ?1")
	List<User> findByName(String name);
	
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
