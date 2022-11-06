package fpoly.chickens.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fpoly.chickens.entity.Product;

public interface ProductService {
	List<Product> findAll();
	
	Page<Product> findAllPage(Pageable pageable);
	
	Product create(Product product);
}
