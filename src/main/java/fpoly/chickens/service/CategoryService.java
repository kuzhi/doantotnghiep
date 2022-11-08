package fpoly.chickens.service;

import java.util.List;

import fpoly.chickens.entity.Category;

public interface CategoryService {
	List<Category> findAll();
	
	// Create
	Category create(Category category);
	// Update
	Category update(Category category);
	// Delete
	void delete(Integer id);
}
