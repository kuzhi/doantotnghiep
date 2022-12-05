package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;
import fpoly.chickens.service.StoreService;

@SessionScope
@Service
public class StoreImplement implements StoreService {
	@Autowired StoreDAO storeDAO;
	
	@Override
	public List<Store> findAll() {
		// TODO Auto-generated method stub
		return storeDAO.findAll();
	}

	@Override
	public List<Store> findStoreById(Integer userid) {
		// TODO Auto-generated method stub
		return storeDAO.findByUserStore(userid);
	}

	@Override
	public Store findByUserid(Integer userid) {
		// TODO Auto-generated method stub
		return storeDAO.findByUserid(userid);
	}

	@Override
	public Store create(Store store) {
		// TODO Auto-generated method stub
		return storeDAO.save(store);
	}

	@Override
	public void deleteStore(Integer storeId) {
		// TODO Auto-generated method stub
	 storeDAO.deleteById(storeId);	
	
	}
	@Override
	public Store update(Store store) {
		// TODO Auto-generated method stub
		return storeDAO.saveAndFlush(store);	
	}
	@Override
	public List<Store> findStoreByName(String name) {
		// TODO Auto-generated method stub
		return storeDAO.findStoreByName(name);
	}

	@Override
	public List<Store> sortAZ() {
		// TODO Auto-generated method stub
		return storeDAO.sortAZ();
	}

	@Override
	public List<Store> sortZA() {
		// TODO Auto-generated method stub
		return storeDAO.sortZA();
	}
}
