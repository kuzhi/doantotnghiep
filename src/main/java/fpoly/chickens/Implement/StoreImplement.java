package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.Store;
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

}
