package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Product;

public interface ProductDAO extends JpaRepository<Product, Integer>{
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
