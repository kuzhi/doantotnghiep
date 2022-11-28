package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.UserRoleApp;

public interface UserRoleAppDAO extends JpaRepository<UserRoleApp, Integer>{
	@Query(value="SELECT roleappid FROM UserRoleApp WHERE userappid = ?1", nativeQuery = true)
	public List<String> findUserRoleIDByUsername(String uname);
}
