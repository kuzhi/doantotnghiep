package fpoly.chickens.service;

import java.util.List;

import fpoly.chickens.entity.Notification;
import fpoly.chickens.entity.Support;
import fpoly.chickens.entity.UserApp;

public interface SupportService {
	List<Support> findAll();

	Support create(Support support);

	Support update(Support support);

	void delete(Integer supportId);

	Support findById(Integer supportId);
	Support findByUserStoreId(Integer userStoreId);

	List<Support> findByUserAppId(Integer supportId);

	List<Support> findByUserName(String name);
	UserApp findUserAppByUserStore(int userStoreId);

	// Sort AZ
	List<Support> sortAZ();

	// Sort ZA
	List<Support> sortZA();

	List<Notification> getNotiSup(int userAppId);
}
