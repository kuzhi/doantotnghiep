package fpoly.chickens.Implement;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
	@Autowired
	StoreDAO storeDAO;

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

	@Override
	public Store findByUserid(Integer userid) {
		// TODO Auto-generated method stub
		return storeDAO.findByUserid(userid);
	}

	@Override
	public Store create(Store store) {
		// TODO Auto-generated method stub

		Store getStore = storeDAO.findDuplicateStoreName(store.getName());
		Store getPhone = storeDAO.findDuplicateStorePhone(store.getPhone());
		Store getAddress = storeDAO.findDuplicateStoreAddress(store.getAddress());
		if (getStore == null && getPhone == null && getAddress == null) {

			return storeDAO.saveAndFlush(store);
		}
		return null;
	}

	@Override
	public void deleteStore(Integer storeId) {
		// TODO Auto-generated method stub
		storeDAO.deleteById(storeId);

	}

	@Override
	public Store update(Store store) {
		// TODO Auto-generated method stub
		Store findStore = this.findById(store.getId());
		Store getStore = storeDAO.findDuplicateStoreName(store.getName());
		Store getPhone = storeDAO.findDuplicateStorePhone(store.getPhone());
		Store getAddress = storeDAO.findDuplicateStoreAddress(store.getAddress());
		Boolean checkName = false;
		Boolean checkPhone = false;
		Boolean checkAddress = false;
		if (getStore == null && getPhone == null && getAddress == null) {

			return storeDAO.saveAndFlush(store);
		} else {
			if (getStore != null) {
				checkName = findStore.getName().equalsIgnoreCase(getStore.getName());

			}
			if (getPhone != null) {
				checkPhone = findStore.getPhone().equalsIgnoreCase(getPhone.getPhone());

			}
			if (getAddress != null) {
				checkAddress = findStore.getAddress().equalsIgnoreCase(getAddress.getAddress());

			}
		}

		if (findStore.getName().equalsIgnoreCase(store.getName())
				|| findStore.getPhone().equalsIgnoreCase(store.getPhone())
				|| findStore.getAddress().equalsIgnoreCase(store.getAddress())) {

			return storeDAO.saveAndFlush(store);

		}
		if (getStore != null && getPhone != null && getAddress != null && checkName == true && checkPhone == true
				&& checkAddress == true) {
			return storeDAO.saveAndFlush(store);
		}
		return null;
	}

	@Override
	public List<Store> findStoreByName(String name) {
		// TODO Auto-generated method stub
		return storeDAO.findStoreByName(name);
	}

	@Override
	public List<Store> sortAZ() {
		// TODO Auto-generated method stub
		return storeDAO.sortAZ();
	}

	@Override
	public List<Store> sortZA() {
		// TODO Auto-generated method stub
		return storeDAO.sortZA();
	}

	@Override
	public Integer getOneStore(Integer userStoreId) {
		// TODO Auto-generated method stub
		return storeDAO.getOneByUserStoreId(userStoreId);
	}

	@Override
	public Store findById(Integer storeid) {
		// TODO Auto-generated method stub
		Store getStore = storeDAO.findById(storeid).get();
		return getStore;

	}

	@Override
	public List<Store> loadListStore() {
		// TODO Auto-generated method stub
		return storeDAO.loadListStore();
	}

	@Override
	public String checkEndDate(Integer storeid) {
		// TODO Auto-generated method stub
		Store store = this.findById(storeid);
		if (store.getDeleted() == false) {
			Date today = new Date();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(today);
			calendar.add(Calendar.DATE, 3);

			today = calendar.getTime();
			Boolean checkDateAfter = today.after(store.getEnddate());

			if (checkDateAfter) {
				return "Ng??y h???t h???n g??i ????ng k?? v??o ng??y " + store.getEnddate()
						+ " vui l??ng li??n h??? nh??n vi??n h??? tr??? ????? gia h???n th??m!";
			}
		}
		return null;
	}

	@Override
	public Integer countStore(Integer userStoreId) {
		// TODO Auto-generated method stub
		return storeDAO.countStoreByUserStore(userStoreId);
	}

	@Override
	public Store trial(Store store) {
		Store findStore = this.findById(store.getId());
		
		if(findStore!=null){
			Calendar cal = Calendar.getInstance();
			cal.set(Calendar.HOUR_OF_DAY, 23);
			cal.set(Calendar.MINUTE, 59);
			cal.set(Calendar.SECOND, 59);

			Date endDate = cal.getTime();
			// System.out.println(endDate);
			if(findStore.getEnddate().before(endDate)){
				findStore.setEnddate(endDate);
				storeDAO.saveAndFlush(findStore);
			}
		}
		
		return null;
	}
}
