package fpoly.chickens.Implement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.UserDAO;
import fpoly.chickens.dao.UserStoreDAO;
import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.UserAdminService;


@SessionScope
@Service
public class UserAdminImplement implements UserAdminService {
	@Autowired UserDAO userDAO;
	@Autowired UserStoreDAO userStoreDAO;
	
	@Autowired
	BCryptPasswordEncoder pe;

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userDAO.findAll();
	}

	@Override
	public Page<User> findAllPage(Pageable pageable) {
		// TODO Auto-generated method stub
		return userDAO.findAll(pageable);
	}

	@Override
	public User create(User user) {
		// TODO Auto-generated method stub
		String encodePass = pe.encode(user.getPassword());
		user.setPassword(encodePass);
		return userDAO.save(user);
	}

	@Override
	public User update(User user) {
		// TODO Auto-generated method stub
		String encodePass = pe.encode(user.getPassword());
		user.setPassword(encodePass);
		return userDAO.saveAndFlush(user);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<User> findUserByName(String name) {
		// TODO Auto-generated method stub
		return userDAO.findByName(name);
	}
	
	@Override
	public List<User> findUserByUserName(String name) {
		// TODO Auto-generated method stub
		return userDAO.findUserByUserName(name);
	}

	@Override
	public List<User> sortAZ() {
		// TODO Auto-generated method stub
		return userDAO.sortAZ();
	}

	@Override
	public List<User> sortZA() {
		// TODO Auto-generated method stub
		return userDAO.sortZA();
	}

	@Override
	public List<User> hoatDong() {
		// TODO Auto-generated method stub
		return userDAO.hoatDong();
	}

	@Override
	public List<User> ngungHoatDong() {
		// TODO Auto-generated method stub
		return userDAO.ngungHoatDong();
	}

	@Override
	public List<User> loadUserWithDeleted(Boolean deleted) {
		// TODO Auto-generated method stub
		return userDAO.loadUserWithDeleted(deleted);
	}

	@Override
	public List<User> findUserByUserNameAndFullName(String username, String fullname) {
		// TODO Auto-generated method stub
		return userDAO.findUserByUserNameAndFullName(username, fullname);
	}

	@Override
	public User findUserByUsername(String name) {
		// TODO Auto-generated method stub
		return userDAO.findByUsername(name);
	}

	@Override
	public List<User> findUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userDAO.findUserByEmail(email);
	}

	@Override
	public List<User> findUserByPhone(String phone) {
		// TODO Auto-generated method stub
		return userDAO.findUserByPhone(phone);
	}

	@Override
	public Optional<UserStore> findUserByID(Integer id) {
		// TODO Auto-generated method stub
		return userStoreDAO.findById(id);
	}

	@Override
	public UserStore loadUserStoreByUserName(String name) {
		// TODO Auto-generated method stub
		return userStoreDAO.loadUserStoreByUserName(name);
	}

	@Override
	public List<User> findUserByEmailForId(String email, Integer id) {
		// TODO Auto-generated method stub
		return userDAO.findUserByEmailForId(email, id);
	}

	@Override
	public List<User> findUserByPhoneForId(String phone, Integer id) {
		// TODO Auto-generated method stub
		return userDAO.findUserByPhoneForId(phone, id);
	}
}
