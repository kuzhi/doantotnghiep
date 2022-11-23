package fpoly.chickens.service;

import java.util.List;

import fpoly.chickens.entity.Pack;

public interface PackService {
	// Load list pack
	List<Pack> findAll();
	// Create
	Pack create(Pack product);
	// Update
	Pack update(Pack product);
	// Delete
	void delete(Integer id);
	
	// Find product by name
	List<Pack> findProductByName(String name);
	// Sort AZ
	List<Pack> sortAZ();
	// Sort ZA
	List<Pack> sortZA();
	// Sort 09
	List<Pack> sort09();
	// Sort 90
	List<Pack> sort90();
}
