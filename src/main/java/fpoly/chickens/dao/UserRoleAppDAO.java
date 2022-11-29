package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.UserRoleApp;

public interface UserRoleAppDAO extends JpaRepository<UserRoleApp, Integer>{
	@Query(value ="SELECT o FROM UserRoleApp o  WHERE o.userapp = 1")
	 UserRoleApp findUserRoleIDByUsername(int userAppId);
}
