package fpoly.chickens.Implement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fpoly.chickens.dao.SupportDAO;
import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserRoleAppDAO;
import fpoly.chickens.entity.Support;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserRoleApp;
import fpoly.chickens.service.SupportService;
import fpoly.chickens.service.UserRoleAppService;

@Service
public class UserRoleAppImplement  implements UserRoleAppService{

    @Autowired
    UserRoleAppDAO uDao;

    @Autowired
    UserAppDAO usserDao;

    @Override
    public UserRoleApp create(UserRoleApp support) {
        // TODO Auto-generated method stub
        return uDao.saveAndFlush(support);
    }

    @Override
    public void delete(Integer supportId) {
        // TODO Auto-generated method stub
        uDao.deleteById(supportId);
    }

    @Override
    public List<UserRoleApp> findAll() {
        // TODO Auto-generated method stub
        return uDao.findAll();
    }

    @Override
    public UserRoleApp findByIds(Integer supportId) {
        // TODO Auto-generated method stub
        UserRoleApp sup =  uDao.findById(supportId).get();
        return sup;
    }


    @Override
    public UserRoleApp update(UserRoleApp support) {
        // TODO Auto-generated method stub
        System.out.println(support);
        return uDao.saveAndFlush(support);
    }

    @Override
    public List<UserRoleApp> findAuthoritiesOfAdmin() {
        // TODO Auto-generated method stub
        List<UserApp> nguoiDung = usserDao.getAdmins();
		return uDao.authoritiesOf(nguoiDung);
      
    }
    @Override
    public Optional<UserRoleApp> findById(Integer id) {
        // TODO Auto-generated method stub
        return uDao.findById(id);
    }

    @Override
    public Boolean existsById(Integer id) {
        // TODO Auto-generated method stub
        return uDao.existsById(id);
    }

    @Override
    public Integer countRoleByUserId(Integer userId) {
        // TODO Auto-generated method stub
        return uDao.countRoleByUserId(userId);
    }
}
