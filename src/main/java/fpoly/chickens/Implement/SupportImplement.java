package fpoly.chickens.Implement;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fpoly.chickens.dao.SupportDAO;
import fpoly.chickens.entity.Support;
import fpoly.chickens.service.SupportService;

@Service
public class SupportImplement implements SupportService {

    @Autowired
    SupportDAO supDao;

    @Override
    public Support create(Support support) {
        // TODO Auto-generated method stub

        Support sup = this.findByStoreId(support.getStore().getId());
        if (sup != null) {
            sup.setUpdate_at(new Date());
            return supDao.saveAndFlush(sup);
        }
        return supDao.saveAndFlush(support);
    }

    @Override
    public void delete(Integer supportId) {
        // TODO Auto-generated method stub
        supDao.deleteById(supportId);
    }

    @Override
    public List<Support> findAll() {
        // TODO Auto-generated method stub
        return supDao.findAll();
    }

    @Override
    public Support findById(Integer supportId) {
        // TODO Auto-generated method stub
        Support sup = supDao.findById(supportId).get();
        return sup;
    }

    @Override
    public Support update(Support support) {
        // TODO Auto-generated method stub
        System.out.println(support);
        return supDao.saveAndFlush(support);
    }

    @Override
    public List<Support> findByUserAppId(Integer supportId) {
        // TODO Auto-generated method stub
        return supDao.findByUserAppId(supportId);
    }

    @Override
    public List<Support> findByUserName(String name) {
        // TODO Auto-generated method stub
        return supDao.findByUserName(name);
    }

    @Override
    public List<Support> sortAZ() {
        // TODO Auto-generated method stub
        return supDao.sortAZ();
    }

    @Override
    public List<Support> sortZA() {
        // TODO Auto-generated method stub
        return supDao.sortZA();
    }
}
