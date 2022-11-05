package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.ShippingTypeDAO;
import fpoly.chickens.entity.ShippingType;
import fpoly.chickens.service.ShippingTypeService;

@SessionScope
@Service
public class ShippingTypeImplement implements ShippingTypeService {

	@Autowired
	ShippingTypeDAO shippingTypeDAO;

	@Override
	public List<ShippingType> getShippingType() {
		return shippingTypeDAO.findAll();
	}

}
