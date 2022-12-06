package fpoly.chickens.service;

import java.util.List;


import fpoly.chickens.entity.Support;

public interface SupportService {
	List<Support> findAll();


	Support create(Support support);


	Support update(Support support);

	void delete(Integer supportId);


	Support findById(Integer supportId);
	Support findByStoreId(Integer storeId);

	List<Support> findByUserAppId(Integer supportId);

}
