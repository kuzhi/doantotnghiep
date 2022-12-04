package fpoly.chickens.Implement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.ProductDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.Product;
import fpoly.chickens.entity.Store;
import fpoly.chickens.service.ProductService;

@SessionScope
@Service
public class ProductImplement implements ProductService {

	@Autowired ProductDAO productDAO;
	@Autowired StoreDAO storeDAO;
	
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

	@Override
	public Product update(Product product) {
		// TODO Auto-generated method stub
		return productDAO.saveAndFlush(product);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		productDAO.deleteById(id);
	}

	@Override
	public List<Product> findProductByName(String name, Integer storeid) {
		Store store = storeDAO.findById(storeid).get();
		// TODO Auto-generated method stub
		return productDAO.findByName(name, store);
	}

	@Override
	public List<Product> sortAZ(Integer storeid) {
		Store store = storeDAO.findById(storeid).get();
		// TODO Auto-generated method stub
		return productDAO.sortAZ(store);
	}

	@Override
	public List<Product> sortZA(Integer storeid) {
		Store store = storeDAO.findById(storeid).get();
		// TODO Auto-generated method stub
		return productDAO.sortZA(store);
	}

	@Override
	public List<Product> sort09(Integer storeid) {
		Store store = storeDAO.findById(storeid).get();
		// TODO Auto-generated method stub
		return productDAO.sort09(store);
	}

	@Override
	public List<Product> sort90(Integer storeid) {
		Store store = storeDAO.findById(storeid).get();
		// TODO Auto-generated method stub
		return productDAO.sort90(store);
	}

	@Override
	public List<Product> findAllProductByStoreWithStatus(Integer storeid, Boolean status) {
		// TODO Auto-generated method stub
		Store store = storeDAO.findById(storeid).get();
		
		return productDAO.findByStoreWithStatus(store, status);
	}

	@Override
	public Page<Product> findAllPageWithStatus(Pageable pageable, Store storeid, Boolean status) {
		// TODO Auto-generated method stub
		return productDAO.loadByStoreWithStatus(pageable, storeid, status);	}
		
		@Override
		public Product findById(Integer id) {
			return productDAO.findById(id).get();
                }
		
		
	
	@Override
	public List<Product> sortCategory(Integer id) {
		// TODO Auto-generated method stub

		return productDAO.sortCategory(id);
	}

	@Override
	public List<Product> findAllProductByStore(Integer storeid, Boolean delete) {
		Store store = storeDAO.findById(storeid).get();
		// TODO Auto-generated method stub
		return productDAO.findByStore(store, delete);
	}
}
