package fpoly.chickens.interceptor;


import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.ListIterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.entity.Store;
import fpoly.chickens.service.StoreService;

@Service
public class ScheduledTask {

    @Autowired
    StoreDAO storeDao;

    @Scheduled(cron = "0 41 18 * * ?")
    public void run() throws InterruptedException{
        Date today = new Date();
        Calendar calendar = Calendar.getInstance();
                calendar.setTime(today);

        List<Store> list = storeDao.findAll();

       for(Store stores : list){
        Boolean checkEqualDate = today.after(stores.getEnddate());
        if(checkEqualDate){
                    stores.setDeleted(true);
                    storeDao.saveAndFlush(stores);
                }
       }

    //   
       
    }
}
