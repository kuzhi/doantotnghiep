package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.PaymentTypeDAO;
import fpoly.chickens.entity.PaymentType;
import fpoly.chickens.service.PaymentTypeService;

@SessionScope
@Service
public class PaymentTypeImplement implements PaymentTypeService {
	
	@Autowired
	PaymentTypeDAO paymentTypeDao;

	@Override
	public List<PaymentType> getPayment() {
		return paymentTypeDao.findAll();
	}

}
