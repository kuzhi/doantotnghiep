package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Store;

public interface StoreDAO extends JpaRepository<Store, Integer>{
	@Query(value="SELECT * FROM Store WHERE UserstoreId = ?1", nativeQuery = true)
	List<Store> findByUserStore(int userStoreId);
	
	
}
