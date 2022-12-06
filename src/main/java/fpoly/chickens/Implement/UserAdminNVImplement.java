package fpoly.chickens.Implement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserRoleAppDAO;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserRoleApp;
import fpoly.chickens.service.UserAdminNVService;

@SessionScope
@Service
public class UserAdminNVImplement implements UserAdminNVService {
	@Autowired
	UserAppDAO userAppDAO;
	@Autowired UserRoleAppDAO userRoleAppDAO;

	@Autowired
	BCryptPasswordEncoder pe;

	@Override
	public List<UserApp> findAll() {
		// TODO Auto-generated method stub
		return userAppDAO.findAll();
	}

	@Override
	public Page<UserApp> findAllPage(Pageable pageable) {
		// TODO Auto-generated method stub
		return userAppDAO.findAll(pageable);
	}

	@Override
	public UserApp create(UserApp user) {
		// TODO Auto-generated method stub
		String encodePass = pe.encode(user.getPassword());
		user.setPassword(encodePass);

		return userAppDAO.save(user);
	}

	@Override
	public UserApp update(UserApp user) {
		// TODO Auto-generated method stub'
		String encodePass = pe.encode(user.getPassword());
		user.setPassword(encodePass);
		return userAppDAO.saveAndFlush(user);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<UserApp> findUserByName(String name) {
		// TODO Auto-generated method stub
		return userAppDAO.findByName(name);
	}

	@Override
	public List<UserApp> findUserByUserName(String name) {
		// TODO Auto-generated method stub
		return userAppDAO.findUserByUserName(name);
	}

	@Override
	public List<UserApp> sortAZ() {
		// TODO Auto-generated method stub
		return userAppDAO.sortAZ();
	}

	@Override
	public List<UserApp> sortZA() {
		// TODO Auto-generated method stub
		return userAppDAO.sortZA();
	}

	@Override
	public List<UserApp> hoatDong() {
		// TODO Auto-generated method stub
		return userAppDAO.hoatDong();
	}

	@Override
	public List<UserApp> ngungHoatDong() {
		// TODO Auto-generated method stub
		return userAppDAO.ngungHoatDong();
	}

	@Override
	public List<UserApp> loadUserWithDeleted(Boolean deleted) {
		// TODO Auto-generated method stub
		return userAppDAO.loadUserWithDeleted(deleted);
	}

	@Override
	public List<UserApp> findUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userAppDAO.findUserByEmail(email);
	}

	@Override
	public List<UserApp> findUserByEmailForId(String email, Integer id) {
		// TODO Auto-generated method stub
		return userAppDAO.findUserByEmailForId(email, id);
	}

	@Override
	public List<UserApp> findUserByPhone(String phone) {
		// TODO Auto-generated method stub
		return userAppDAO.findUserByPhone(phone);
	}

	@Override
	public UserApp findUsersByUserName(String name) {
		// TODO Auto-generated method stub
		return userAppDAO.findByUsername(name);
	}

	@Override
	public List<UserApp> findUserByPhoneForId(String phone, Integer id) {
		// TODO Auto-generated method stub
		return userAppDAO.findUserByPhoneForId(phone, id);
	}

	@Override
	public Optional<UserApp> findUserByID(Integer id) {
		// TODO Auto-generated method stub
		return userAppDAO.findById(id);
	}

	@Override
	public List<UserApp> getAdmins() {
		// TODO Auto-generated method stub
		return userAppDAO.getAdmins();
	}

	@Override
	public Boolean checkPassword(UserApp uStore, String password) {
		// TODO Auto-generated method stub
		boolean match = pe.matches(password, uStore.getPassword().trim());

		return match;
	}

	@Override
	public UserApp updateProfile(UserApp userapp) {
		// TODO Auto-generated method stub
		return userAppDAO.saveAndFlush(userapp);
	}

	@Override
	public UserRoleApp createUserRoleApp(UserRoleApp userRoleApp) {
		// TODO Auto-generated method stub
		return userRoleAppDAO.save(userRoleApp);
	}
}
