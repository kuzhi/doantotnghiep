package fpoly.chickens.Implement;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.CartDAO;
import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.dao.UserDAO;
import fpoly.chickens.entity.Cart;
import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.User;
import fpoly.chickens.service.CartService;

@SessionScope
@Service
public class CartImplement implements CartService{
	
	@Autowired
	CartDAO cartDao;
	
	@Autowired
	UserDAO userDao;
	
	@Autowired
	StoreDAO storeDao;
	
	@Override
	public List<Cart> getCart(Integer storeid, Integer userid){
		
		List<Cart> list = cartDao.getCart(storeid, userid);
		return list;
	}
}
