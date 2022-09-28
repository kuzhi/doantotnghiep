package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fpoly.chickens.entity.UserRoleApp;

public interface UserRoleAppDAO extends JpaRepository<UserRoleApp, Integer>{

}
