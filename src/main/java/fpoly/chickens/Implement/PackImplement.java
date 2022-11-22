package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.PackDAO;
import fpoly.chickens.entity.Pack;
import fpoly.chickens.service.PackService;

@SessionScope
@Service
public class PackImplement implements PackService {
	@Autowired PackDAO packDAO;
	
	@Override
	public List<Pack> findAll() {
		// TODO Auto-generated method stub
		return packDAO.findAll();
	}

	@Override
	public Pack create(Pack product) {
		// TODO Auto-generated method stub
		return packDAO.save(product);
	}

	@Override
	public Pack update(Pack product) {
		// TODO Auto-generated method stub
		return packDAO.saveAndFlush(product);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		packDAO.deleteById(id);
	}

	@Override
	public List<Pack> findProductByName(String name) {
		// TODO Auto-generated method stub
		return packDAO.findByName(name);
	}

	@Override
	public List<Pack> sortAZ() {
		// TODO Auto-generated method stub
		return packDAO.sortAZ();
	}

	@Override
	public List<Pack> sortZA() {
		// TODO Auto-generated method stub
		return packDAO.sortZA();
	}

	@Override
	public List<Pack> sort09() {
		// TODO Auto-generated method stub
		return packDAO.sort09();
	}

	@Override
	public List<Pack> sort90() {
		// TODO Auto-generated method stub
		return packDAO.sort90();
	}

}
