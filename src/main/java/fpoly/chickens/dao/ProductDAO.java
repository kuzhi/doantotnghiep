package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Product;
import fpoly.chickens.entity.Store;

public interface ProductDAO extends JpaRepository<Product, Integer>{
	
	// Load product by store
	@Query("SELECT o FROM Product o WHERE o.category.store LIKE ?1 AND o.Deleted = ?2 ")
	List<Product> findByStore(Store storeid, Boolean delete);

	// Load product by store with status == true
	@Query("SELECT o FROM Product o WHERE o.category.store LIKE ?1 AND o.Status = ?2")
	List<Product> findByStoreWithStatus(Store storeid, Boolean status);
	
	@Query("SELECT o FROM Product o WHERE o.category.store LIKE ?1 AND o.Status = ?2")
	Page<Product> loadByStoreWithStatus(Pageable pageable, Store storeid, Boolean status);
	
	// Find by name
	@Query(value = "SELECT o FROM Product o WHERE o.Name LIKE ?1 AND o.Deleted = 0 AND o.category.store LIKE ?2 ")
	List<Product> findByName(String name, Store storeid);
	
	// Sort A-Z
	@Query(value = "SELECT o FROM Product o WHERE o.category.store LIKE ?1 AND o.Deleted = 0 ORDER BY o.Name ASC")
	List<Product> sortAZ(Store storeid);

	// Sort A-Z
	@Query(value = "SELECT o FROM Product o WHERE o.category.store LIKE ?1 AND o.Deleted = 0 ORDER BY o.Name DESC")
	List<Product> sortZA(Store storeid);
	
	// Sort A-Z
	@Query(value = "SELECT o FROM Product o WHERE o.category.store LIKE ?1 AND o.Deleted = 0 ORDER BY o.Price ASC")
	List<Product> sort09(Store storeid);
	
	// Sort A-Z
	@Query(value = "SELECT o FROM Product o WHERE o.category.store LIKE ?1 AND o.Deleted = 0 ORDER BY o.Price DESC")
	List<Product> sort90(Store storeid);

	
	// Sort Category
	@Query(value = "SELECT o FROM Product o WHERE o.category.id= ?1 AND o.Deleted = 0")
	List<Product> sortCategory(Integer id);
	
}
