package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fpoly.chickens.entity.Category;

public interface CategoryDAO extends JpaRepository<Category, Integer> {

}
