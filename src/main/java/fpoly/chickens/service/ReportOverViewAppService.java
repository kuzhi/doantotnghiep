package fpoly.chickens.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import fpoly.chickens.entity.OrderDetail;
import fpoly.chickens.entity.ReportOverViewApp;
import fpoly.chickens.entity.ReportProductApp;

public interface ReportOverViewAppService {

	List<ReportOverViewApp> showTop5Product(Integer status, Integer storeid);

	List<ReportProductApp> showTop10Product(Date dateStart, Date dateEnd, Integer storeid, Integer status);

}
