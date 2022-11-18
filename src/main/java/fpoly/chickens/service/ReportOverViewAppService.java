package fpoly.chickens.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.ReportOverViewApp;
import fpoly.chickens.entity.ReportProductApp;

public interface ReportOverViewAppService {
	List<ReportOverViewApp> showTop5Product();
	
	ArrayList<String> loadListProductByDate(Integer storeid, Date dateStar, Date dateEnd);
	List<ReportProductApp> loadDataListProductByDate(Integer storeid, Date dateStar, Date dateEnd);
}
