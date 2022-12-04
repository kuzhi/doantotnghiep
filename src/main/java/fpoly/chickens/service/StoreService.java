package fpoly.chickens.service;

import java.util.List;

import fpoly.chickens.entity.Store;

public interface StoreService {
	List<Store> findAll();
	
	List<Store> findStoreById(Integer userid);
	Store findByUserid(Integer userid);

	Store create(Store store);

	Store update(Store store);

	void deleteStore(Integer storeId);
	// Find by name
	List<Store> findStoreByName(String name);
	// Sort AZ
		List<Store> sortAZ();
		// Sort ZA
		List<Store> sortZA();

		Integer getOneStore(Integer userStoreId);	

		Store findById(Integer storeid);
}
