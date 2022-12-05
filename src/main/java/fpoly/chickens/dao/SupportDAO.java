package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Support;

public interface SupportDAO extends JpaRepository<Support, Integer> {

    @Query(value = "SELECT o FROM Support o WHERE o.userApp.id = ?1")
    List<Support> findByUserAppId(int userAppId);

    @Query(value = "select * from Support, UserApp where UserApp.Fullname like ?1 and UserApp.ID = Support.UserAppId and Deleted = 0", nativeQuery = true)
    List<Support> findByUserName(String name);

    // Sort A-Z
    @Query(value = "SELECT * FROM Support, UserApp WHERE Deleted = 0 and UserApp.ID = Support.UserAppId ORDER BY Fullname ASC", nativeQuery = true)
    List<Support> sortAZ();

    // Sort A-Z
    @Query(value = "SELECT * FROM Support, UserApp WHERE Deleted = 0 and UserApp.ID = Support.UserAppId ORDER BY Fullname DESC", nativeQuery = true)
    List<Support> sortZA();
}
