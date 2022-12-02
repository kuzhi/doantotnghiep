package fpoly.chickens.service;

import java.util.List;
import java.util.Optional;

import fpoly.chickens.entity.Support;
import fpoly.chickens.entity.UserRoleApp;

public interface UserRoleAppService {
	List<UserRoleApp> findAll();


	UserRoleApp create(UserRoleApp support);


	UserRoleApp update(UserRoleApp support);

	void delete(Integer supportId);


	UserRoleApp findByIds(Integer userRoleId);

	List<UserRoleApp> findAuthoritiesOfAdmin();

	Optional<UserRoleApp> findById(Integer id);

	Boolean existsById(Integer id) ;

	Integer countRoleByUserId(Integer userId);
}
