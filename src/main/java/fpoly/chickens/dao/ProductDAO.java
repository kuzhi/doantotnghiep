package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Product;

public interface ProductDAO extends JpaRepository<Product, Integer>{
	
	@Query(value = "SELECT o FROM Product o WHERE o.Name LIKE ?1")
	List<Product> findByName(String name);
}
