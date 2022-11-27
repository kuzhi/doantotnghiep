package fpoly.chickens.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fpoly.chickens.entity.Category;
import fpoly.chickens.entity.Store;

public interface CategoryDAO extends JpaRepository<Category, Integer> {
	// Find by storeid
	@Query("SELECT o FROM Category o WHERE o.store = ?1 AND o.Deleted = ?2 ")
	List<Category> findAllByStore(Store storeid, Boolean delete);
}
