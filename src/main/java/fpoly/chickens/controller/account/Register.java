package fpoly.chickens.controller.account;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import fpoly.chickens.entity.Store;
import fpoly.chickens.entity.Support;
import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.StoreService;
import fpoly.chickens.service.SupportService;
import fpoly.chickens.service.UserAdminKHService;
import fpoly.chickens.service.UserAdminNVService;
import fpoly.chickens.service.UserAdminService;

@Controller
@RequestMapping("home/register")
public class Register {
    
    @Autowired
	BCryptPasswordEncoder pe;


    @Autowired
    HttpServletRequest req;

    @Autowired
    StoreService storeService;

    @Autowired
    UserAdminService userAdminService ;

    @Autowired
    UserAdminKHService userAdminKHService ;

    @Autowired
    UserAdminNVService userAdminNVService ;

    @Autowired
    SupportService supportService ;

    @GetMapping("form-user")
    public String getFormU(Model model){
        model.addAttribute("user", new User());
        return "home/account/registerUser";
    }

    @GetMapping("form-store")
    public String getFormS(Model model){
        model.addAttribute("store", new UserStore());
        return "home/account/registerStore";
    }

    @PostMapping("create-user")
       public String createNew(Model model, @ModelAttribute Optional<User> user){
        model.addAttribute("user", user);
        String confirmPass = req.getParameter("password2");
        if(user.isPresent()){
            //model.addAttribute("error", "user");
            List<UserStore> checkUStore = userAdminKHService.findUserByUserName(user.get().getUsername());
           List<UserStore> checkEmailUStore = userAdminKHService.findUserByEmail(user.get().getEmail());
           List<UserStore> checkPhoneUStore = userAdminKHService.findUserByPhone(user.get().getPhone());

            List<UserApp> checkUApp = userAdminNVService.findUserByUserName(user.get().getUsername());
            List<UserApp> checkEmailUApp = userAdminNVService.findUserByEmail(user.get().getEmail());
            List<UserApp> checkPhoneUApp = userAdminNVService.findUserByPhone(user.get().getPhone());

            List<User> checkU = userAdminService.findUserByUserName(user.get().getUsername());
            List<User> checkEmailU = userAdminService.findUserByEmail(user.get().getEmail());
            List<User> checkPhoneU = userAdminService.findUserByPhone(user.get().getPhone());


            boolean check = user.get().getPassword().equals(confirmPass);
            
          
            if(checkU.size()==0 && checkUApp.size()==0 && checkUStore.size()==0 
            && checkEmailUStore.size()==0 && checkEmailUApp.size() == 0 && checkEmailU.size() == 0 
            && checkPhoneUStore.size() == 0 && checkPhoneUApp.size() == 0 && checkPhoneU.size() == 0){
              if(check){
                user.get().setDeleted(false);
                user.get().setStatus(true);
                userAdminService.create(user.get());
                model.addAttribute("message", "????ng K?? th??nh c??ng");
                model.addAttribute("user", new User());
                return "home/account/registerUser";
              }
               
              model.addAttribute("error", "Kh??ng tr??ng m???t kh???u v?? m???t kh???u x??c nh???n!");
              return "home/account/registerUser";
            }else{
                model.addAttribute("error", "T??i kho???n ho???c email ho???c s??? ??i???n tho???i n??y ???? ???????c s??? d???ng");

            }

            return "home/account/registerUser";
          
         
           
        }
        model.addAttribute("error", "Thi???u tr?????ng");

        return "home/account/registerUser";
    }

    @PostMapping("create-store")
    public String createNewStore(Model model, @ModelAttribute Optional<UserStore> userStore){
        model.addAttribute("store", userStore);
        String confirmPass = req.getParameter("password2");
        Support support = new Support();


        if(userStore.isPresent()){
            //model.addAttribute("error", "user");
            List<UserStore> checkUStore = userAdminKHService.findUserByUserName(userStore.get().getUsername());
           List<UserStore> checkEmailUStore = userAdminKHService.findUserByEmail(userStore.get().getEmail());
           List<UserStore> checkPhoneUStore = userAdminKHService.findUserByPhone(userStore.get().getPhone());

            List<UserApp> checkUApp = userAdminNVService.findUserByUserName(userStore.get().getUsername());
            List<UserApp> checkEmailUApp = userAdminNVService.findUserByEmail(userStore.get().getEmail());
            List<UserApp> checkPhoneUApp = userAdminNVService.findUserByPhone(userStore.get().getPhone());

            List<User> checkU = userAdminService.findUserByUserName(userStore.get().getUsername());
            List<User> checkEmailU = userAdminService.findUserByEmail(userStore.get().getEmail());
            List<User> checkPhoneU = userAdminService.findUserByPhone(userStore.get().getPhone());


            boolean check = userStore.get().getPassword().equals(confirmPass);
            if(checkU.size()==0 && checkUApp.size()==0 && checkUStore.size()==0
            && checkEmailUStore.size()==0 && checkEmailUApp.size() == 0 && checkEmailU.size() == 0 
            && checkPhoneUStore.size() == 0 && checkPhoneUApp.size() == 0 && checkPhoneU.size() == 0){
              if(check){
                userStore.get().setDeleted(false);
                userStore.get().setGender(true);
                userStore.get().setStatus(true);
                UserStore uStore = userStore.get();

                userAdminKHService.create(uStore);
    
                Date endDate = new Date();
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(endDate);
                calendar.add(Calendar.DATE,3);
                endDate = calendar.getTime();
                Store store = new Store();
                store.setUserstoreId(uStore);
                store.setName(uStore.getUsername() + uStore.getId());
                store.setEnddate(endDate);
                store.setCreate_at(new Date());
                store.setDeleted(false);
                storeService.create(store);

                support.setCreate_at(new Date());
                support.setStatus(false);
                support.setUserStore(uStore);
                support.setNotes("C???a h??ng c???a ng?????i d??ng "+ uStore.getUsername()+" m???i t???o c???n ng?????i h??? tr???");
                supportService.create(support);

                model.addAttribute("store", new UserStore());

                model.addAttribute("message", "????ng K?? th??nh c??ng");

                return "home/account/registerStore";
              }
                
              model.addAttribute("error", "Kh??ng tr??ng m???t kh???u v?? m???t kh???u x??c nh???n!");
              return "home/account/registerStore";

            }else{
                model.addAttribute("error", "T??i kho???n ho???c email ho???c s??? ??i???n tho???i n??y ???? ???????c s??? d???ng");
                return "home/account/registerStore";
            }
            
           
        }
        model.addAttribute("error", "Thi???u tr?????ng");

        return "home/account/registerStore";
    }


}
