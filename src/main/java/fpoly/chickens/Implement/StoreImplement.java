package fpoly.chickens.Implement;

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
			System.out.println(findStore.getName());
			System.out.println(store.getName());
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
		if (getStore.getDeleted() == false) {
			return getStore;
		}
		return null;
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
		if(store.getDeleted()==false){
			Date today = new Date();
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(today);
                calendar.add(Calendar.DATE,3);
				
                today = calendar.getTime();
			Boolean checkDateAfter= today.after(store.getEnddate());

		
			if(checkDateAfter){
				return "Còn gần ba ngày nữa là hết hạn gói đăng ký của bạn vui lòng liên hệ nhân viên hỗ trợ để gia hạn thêm!";
			}
		}
		return null;
	}

	@Override
	public Integer countStore(Integer userStoreId) {
		// TODO Auto-generated method stub
		return storeDAO.countStoreByUserStore(userStoreId);
	}
}
