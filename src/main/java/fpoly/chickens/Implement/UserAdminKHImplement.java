package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.UserStoreDAO;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.UserAdminKHService;

@SessionScope
@Service
public class UserAdminKHImplement implements UserAdminKHService {
	@Autowired UserStoreDAO userStoreDAO;

	@Override
	public List<UserStore> findAll() {
		// TODO Auto-generated method stub
		return userStoreDAO.findAll();
	}

	@Override
	public Page<UserStore> findAllPage(Pageable pageable) {
		// TODO Auto-generated method stub
		return userStoreDAO.findAll(pageable);
	}

	@Override
	public UserStore create(UserStore user) {
		// TODO Auto-generated method stub
		return userStoreDAO.save(user);
	}

	@Override
	public UserStore update(UserStore user) {
		// TODO Auto-generated method stub
		return userStoreDAO.saveAndFlush(user);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<UserStore> findUserByName(String name) {
		// TODO Auto-generated method stub
		return userStoreDAO.findByName(name);
	}
	
	@Override
	public List<UserStore> findUserByUserName(String name) {
		// TODO Auto-generated method stub
		return userStoreDAO.findUserByUserName(name);
	}

	@Override
	public List<UserStore> sortAZ() {
		// TODO Auto-generated method stub
		return userStoreDAO.sortAZ();
	}

	@Override
	public List<UserStore> sortZA() {
		// TODO Auto-generated method stub
		return userStoreDAO.sortZA();
	}

	@Override
	public List<UserStore> hoatDong() {
		// TODO Auto-generated method stub
		return userStoreDAO.hoatDong();
	}

	@Override
	public List<UserStore> ngungHoatDong() {
		// TODO Auto-generated method stub
		return userStoreDAO.ngungHoatDong();
	}

	@Override
	public List<UserStore> loadUserWithDeleted(Boolean deleted) {
		// TODO Auto-generated method stub
		return userStoreDAO.loadUserWithDeleted(deleted);
	}

	@Override
	public List<UserStore> findUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userStoreDAO.findUserByEmail(email);
	}

	@Override
	public List<UserStore> findUserByEmailForId(String email, Integer id) {
		// TODO Auto-generated method stub
		return userStoreDAO.findUserByEmailForId(email, id);
	}

	@Override
	public List<UserStore> findUserByPhone(String phone) {
		// TODO Auto-generated method stub
		return userStoreDAO.findUserByPhone(phone);
	}

	@Override

	public UserStore findUsersByUserName(String name) {
		// TODO Auto-generated method stub
		return userStoreDAO.findByUsername(name);
	}
	@Override
		public List<UserStore> findUserByPhoneForId(String phone, Integer id) {
			// TODO Auto-generated method stub
			return userStoreDAO.findUserByPhoneForId(phone, id);
		}
	}
