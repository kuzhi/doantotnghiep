package fpoly.chickens.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.Store;

public interface OrderDetailService {

	List<OrderDetail> findByOrder(Integer integer);
	//====== Lấy id
	ArrayList<String> getIdforReport(Integer storeid, Date dateStar, Date dateEnd);
	//====== Lấy dữ liệu từ id
	Integer getTotalReport(Integer storeid, Date dateStar, Date dateEnd, Integer productId);
}
