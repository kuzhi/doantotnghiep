package fpoly.chickens.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fpoly.chickens.entity.Product;

public interface ProductService {
	// Load all product	
	List<Product> findAll();
	Page<Product> findAllPage(Pageable pageable);
	
	// Create
	Product create(Product product);
	// Update
	Product update(Product product);
	// Delete
	void delete(Integer id);
}
