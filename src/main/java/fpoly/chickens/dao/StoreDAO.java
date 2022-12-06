package fpoly.chickens.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Store;

public interface StoreDAO extends JpaRepository<Store, Integer>{
	@Query(value="SELECT * FROM Store WHERE UserstoreId = ?1 and Deleted = 0", nativeQuery = true)
	List<Store> findByUserStore(int userStoreId);


	@Query(value="SELECT * FROM Store WHERE UserstoreId = ?1", nativeQuery = true)
	Store findByUserid(int userStoreId);
	

	@Query(value="select * from Store where Name like ?1 and Deleted = 0", nativeQuery = true)
	List<Store> findStoreByName(String name);
	

	//find  store is duplicate name
	@Query(value="SELECT top(1) * FROM Store WHERE Name = ?1 and Deleted=0" , nativeQuery = true)
	Store findDuplicateStoreName(String name);

	@Query(value="SELECT top(1) * FROM Store WHERE Phone = ?1 and Deleted=0", nativeQuery = true)
	Store findDuplicateStorePhone(String name);

	@Query(value="SELECT top(1) * FROM Store WHERE Address = ?1 and Deleted=0", nativeQuery = true)
	Store findDuplicateStoreAddress(String name);



	//get one store
	@Query(value="SELECT top(1) * FROM Store WHERE UserstoreId = ?1 and Deleted=0", nativeQuery = true)
	Store getStoreByUserStoreId(int userStoreId);

	@Query(value="SELECT top(1) id FROM Store WHERE UserstoreId = ?1 and Deleted=0", nativeQuery = true)
	Integer getOneByUserStoreId(int userStoreId);

	@Query(value="SELECT EndDate FROM Store WHERE UserstoreId = ?1 and Deleted=0", nativeQuery = true)
	List<Date> getDate(int userStoreId);

// Sort A-Z
	@Query(value = "SELECT * FROM Store WHERE Deleted = 0 ORDER BY Name ASC", nativeQuery = true)
	List<Store> sortAZ();

		// Sort A-Z
		@Query(value = "SELECT * FROM Store WHERE Deleted = 0 ORDER BY Name DESC", nativeQuery = true)
		List<Store> sortZA();
	
}
