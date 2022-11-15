package fpoly.chickens.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fpoly.chickens.entity.Product;

public interface ProductService {
	// Load all product	
	List<Product> findAll();
	Page<Product> findAllPage(Pageable pageable);
	
	// Load product by store
	List<Product> findAllProductByStore(Integer storeid);
	List<Product> findAllProductByStoreWithStatus(Integer storeid, Boolean status);
	
	// Create
	Product create(Product product);
	// Update
	Product update(Product product);
	// Delete
	void delete(Integer id);
	
	// Find product by name
	List<Product> findProductByName(String name);
	// Sort AZ
	List<Product> sortAZ();
	// Sort ZA
	List<Product> sortZA();
	// Sort 09
	List<Product> sort09();
	// Sort 90
	List<Product> sort90();
}
