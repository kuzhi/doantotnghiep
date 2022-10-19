package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fpoly.chickens.entity.UserApp;

public interface UserAppDAO extends JpaRepository<UserApp, Integer>{

}
