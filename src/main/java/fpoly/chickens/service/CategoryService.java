package fpoly.chickens.service;

import java.util.List;

import fpoly.chickens.entity.Category;

public interface CategoryService {
	List<Category> findAll();
	
	// Find all category by storeid
	List<Category> findAllByStore(Integer storeid);
	
	// Create
	Category create(Category category, Integer storeid);
	// Update
	Category update(Category category);
	// Delete
	void delete(Integer id);

}
