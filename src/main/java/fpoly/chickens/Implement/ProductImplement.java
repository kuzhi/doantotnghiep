package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.ProductDAO;
import fpoly.chickens.entity.Product;
import fpoly.chickens.service.ProductService;

@SessionScope
@Service
public class ProductImplement implements ProductService {

	@Autowired ProductDAO productDAO;
	
	@Override
	public List<Product> findAll() {
		// TODO Auto-generated method stub
		return productDAO.findAll();
	}

	@Override
	public Page<Product> findAllPage(Pageable pageable) {
		// TODO Auto-generated method stub
		return productDAO.findAll(pageable);
	}

	@Override
	public Product create(Product product) {
		// TODO Auto-generated method stub
		return productDAO.save(product);
	}

}
