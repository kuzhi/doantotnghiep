package fpoly.chickens.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import fpoly.chickens.dao.PackDAO;
import fpoly.chickens.entity.Pack;
import fpoly.chickens.service.PackService;

@SessionScope
@Service
public class PackImplement implements PackService {
	@Autowired PackDAO packDAO;
	
	@Override
	public List<Pack> findAll() {
		// TODO Auto-generated method stub
		return packDAO.findAll();
	}

}
