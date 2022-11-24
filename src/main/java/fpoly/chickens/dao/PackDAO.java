package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Pack;


public interface PackDAO extends JpaRepository<Pack, Integer> {
	// Find by name
	@Query(value = "SELECT o FROM Pack o WHERE o.Name LIKE ?1")
	List<Pack> findByName(String name);
	
	// Sort A-Z
	@Query(value = "SELECT o FROM Pack o ORDER BY o.Name ASC")
	List<Pack> sortAZ();

	// Sort A-Z
	@Query(value = "SELECT o FROM Pack o ORDER BY o.Name DESC")
	List<Pack> sortZA();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM Pack o ORDER BY o.Price ASC")
	List<Pack> sort09();
	
	// Sort A-Z
	@Query(value = "SELECT o FROM Pack o ORDER BY o.Price DESC")
	List<Pack> sort90();
}
