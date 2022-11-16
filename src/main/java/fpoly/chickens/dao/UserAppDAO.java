package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.UserApp;

public interface UserAppDAO extends JpaRepository<UserApp, Integer>{
	@Query(value="SELECT * FROM UserApp WHERE username = ?1", nativeQuery = true)
	public UserApp findByUsername(String uname);
}
