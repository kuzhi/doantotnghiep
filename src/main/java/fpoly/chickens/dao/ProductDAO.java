package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fpoly.chickens.entity.Product;

public interface ProductDAO extends JpaRepository<Product, Integer>{

}
