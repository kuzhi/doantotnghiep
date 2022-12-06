package fpoly.chickens.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fpoly.chickens.entity.Product;
import fpoly.chickens.entity.Store;

public interface ProductService {
	// Load all product
	List<Product> findAll();

	Page<Product> findAllPage(Pageable pageable);

	Page<Product> findAllPageWithStatus(Pageable pageable, Store storeid, Boolean status);

	// Load product by store
	List<Product> findAllProductByStore(Integer storeid, Boolean delete);

	List<Product> findAllProductByStoreWithStatus(Integer storeid, Boolean status);

	// Create
	Product create(Product product);

	// Update
	Product update(Product product);

	// Delete
	void delete(Integer id);

	// Find product by name
	List<Product> findProductByName(String name, Integer storeid);

	// Sort AZ
	List<Product> sortAZ(Integer storeid);

	// Sort ZA
	List<Product> sortZA(Integer storeid);

	// Sort 09
	List<Product> sort09(Integer storeid);

	// Sort 90
	List<Product> sort90(Integer storeid);

	// Sort category
	List<Product> sortCategory(Integer id);

	// Find product by id
	Product findById(Integer id);
}
