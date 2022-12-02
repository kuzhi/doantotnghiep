package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserRoleApp;

public interface UserRoleAppDAO extends JpaRepository<UserRoleApp, Integer>{
	@Query(value ="SELECT o.roleapp.RoleName FROM UserRoleApp o  WHERE o.userapp.id = ?1")
	 List<String> findUserRoleIDByUsername(int userAppId);

	 @Query("select distinct o from UserRoleApp o where o.userapp in ?1")
	 List<UserRoleApp> authoritiesOf(List<UserApp> userApp);

	 @Query(value ="SELECT count(o) FROM UserRoleApp o  WHERE o.userapp.id = ?1")
	 Integer countRoleByUserId(int userAppId);
}
