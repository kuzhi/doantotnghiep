package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fpoly.chickens.entity.UserRole;

public interface UserRoleDAO  extends JpaRepository<UserRole, Integer>{

}
