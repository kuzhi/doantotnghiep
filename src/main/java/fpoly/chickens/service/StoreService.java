package fpoly.chickens.service;

import java.util.List;

import fpoly.chickens.entity.Store;

public interface StoreService {
	List<Store> findAll();
	
	List<Store> findStoreById(Integer userid);
}
