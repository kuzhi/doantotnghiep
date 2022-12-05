package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.UserApp;

public interface StoreDAO extends JpaRepository<Store, Integer>{
	@Query(value="SELECT * FROM Store WHERE UserstoreId = ?1", nativeQuery = true)
	List<Store> findByUserStore(int userStoreId);


	@Query(value="SELECT * FROM Store WHERE UserstoreId = ?1", nativeQuery = true)
	Store findByUserid(int userStoreId);
	
	@Query(value="select * from Store where Name like ?1 and Deleted = 0", nativeQuery = true)
	List<Store> findStoreByName(String name);

	// Sort A-Z
	@Query(value = "SELECT * FROM Store WHERE Deleted = 0 ORDER BY Name ASC", nativeQuery = true)
	List<Store> sortAZ();

		// Sort A-Z
		@Query(value = "SELECT * FROM Store WHERE Deleted = 0 ORDER BY Name DESC", nativeQuery = true)
		List<Store> sortZA();
}
