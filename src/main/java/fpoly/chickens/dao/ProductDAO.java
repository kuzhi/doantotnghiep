package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Product;
import fpoly.chickens.entity.Store;

public interface ProductDAO extends JpaRepository<Product, Integer>{
	
	// Load product by store
	@Query("SELECT o FROM Product o WHERE o.category.store LIKE ?1")
	List<Product> findByStore(Store storeid);

	// Load product by store with status == true
	@Query("SELECT o FROM Product o WHERE o.category.store LIKE ?1 AND o.Status = ?2")
	List<Product> findByStoreWithStatus(Store storeid, Boolean status);
	
	// Find by name
	@Query(value = "SELECT o FROM Product o WHERE o.Name LIKE ?1")
	List<Product> findByName(String name);
	
	// Sort A-Z
	@Query(value = "SELECT o FROM Product o ORDER BY o.Name ASC")
	List<Product> sortAZ();

	// Sort A-Z
	@Query(value = "SELECT o FROM Product o ORDER BY o.Name DESC")
	List<Product> sortZA();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM Product o ORDER BY o.Price ASC")
	List<Product> sort09();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM Product o ORDER BY o.Price DESC")
	List<Product> sort90();
	
}
