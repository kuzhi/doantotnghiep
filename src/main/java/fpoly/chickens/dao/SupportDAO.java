package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Support;

public interface SupportDAO extends JpaRepository<Support, Integer>{

    @Query(value="SELECT o FROM Support o WHERE o.userApp.id = ?1")
	List<Support> findByUserAppId(int userAppId);
}
