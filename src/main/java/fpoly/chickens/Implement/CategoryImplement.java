package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.CategoryDAO;
import fpoly.chickens.entity.Category;
import fpoly.chickens.service.CategoryService;

@SessionScope
@Service
public class CategoryImplement implements CategoryService {

	@Autowired CategoryDAO categoryDAO;
	
	@Override
	public List<Category> findAll() {
		// TODO Auto-generated method stub
		return categoryDAO.findAll();
	}

	@Override
	public Category create(Category category) {
		// TODO Auto-generated method stub
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
}
