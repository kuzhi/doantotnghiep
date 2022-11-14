package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.CategoryDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.Category;
import fpoly.chickens.entity.Store;
import fpoly.chickens.service.CategoryService;

@SessionScope
@Service
public class CategoryImplement implements CategoryService {

	@Autowired CategoryDAO categoryDAO;
	@Autowired StoreDAO storeDAO;
	
	@Override
	public List<Category> findAll() {
		// TODO Auto-generated method stub
		return categoryDAO.findAll();
	}

	@Override
	public Category create(Category category, Integer storeid) {
		// TODO Auto-generated method stub
		Store store = storeDAO.findById(storeid).get();
		category.setStore(store);
		
		return categoryDAO.save(category);
	}

	@Override
	public Category update(Category category) {
		// TODO Auto-generated method stub
		
		return categoryDAO.saveAndFlush(category);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		categoryDAO.deleteById(id);
	}

	@Override
	public List<Category> findAllByStore(Integer storeid) {
		// TODO Auto-generated method stub
		Store store = storeDAO.findById(storeid).get();
		
		return categoryDAO.findAllByStore(store);
	}
}
