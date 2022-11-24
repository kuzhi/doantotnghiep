package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.UserStore;


public interface UserStoreDAO extends JpaRepository<UserStore, Integer> {
	@Query(value="SELECT * FROM UserStore WHERE username = ?1", nativeQuery = true)
	public UserStore findByUsername(String uname);
}
