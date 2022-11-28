package fpoly.chickens.controller.account;

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

<<<<<<< HEAD
import fpoly.chickens.dao.StoreDAO;
=======

>>>>>>> 242a2bc3c6643f2494ff010adb6694fa743e7158
import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.UserAdminKHService;
import fpoly.chickens.service.UserAdminNVService;
import fpoly.chickens.service.UserAdminService;
import fpoly.chickens.service.UserService;

@Controller
@RequestMapping("home/register")
public class Register {
    
    @Autowired
	BCryptPasswordEncoder pe;


    @Autowired
    HttpServletRequest req;

    @Autowired
	StoreDAO storeDao;
<<<<<<< HEAD


=======
  
>>>>>>> 242a2bc3c6643f2494ff010adb6694fa743e7158
    @Autowired
    UserAdminService userAdminService ;

    @Autowired
    UserAdminKHService userAdminKHService ;

    @Autowired
    UserAdminNVService userAdminNVService ;

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
        if(user.isPresent()){
            //model.addAttribute("error", "user");
            List<UserStore> checkUStore = userAdminKHService.findUserByUserName(user.get().getUsername());
            List<UserApp> checkUApp = userAdminNVService.findUserByUserName(user.get().getUsername());
            List<User> checkU = userAdminService.findUserByUserName(user.get().getUsername());
            if(checkU.isEmpty() && checkUApp.isEmpty() && checkUStore.isEmpty()){
                String passwordEncode =pe.encode(user.get().getPassword());
                user.get().setPassword(passwordEncode);
                userAdminService.create(user.get());
                model.addAttribute("error", "Tài khoản hoặc  này đã được sử dụng");

                return "home/account/register";
            }
            model.addAttribute("error", "Tài khoản hoặc email này đã được sử dụng");
            return "home/account/register";
        }
        model.addAttribute("error", "Thiếu trường");

        return "home/account/register";
    }

    @PostMapping("create-store")
<<<<<<< HEAD
=======

>>>>>>> 242a2bc3c6643f2494ff010adb6694fa743e7158
    public String createNewStore(Model model, @ModelAttribute Optional<UserStore> userStore){
        model.addAttribute("store", userStore);
        if(userStore.isPresent()){
            //model.addAttribute("error", "user");
            List<UserStore> checkUStore = userAdminKHService.findUserByUserName(userStore.get().getUsername());
            List<UserApp> checkUApp = userAdminNVService.findUserByUserName(userStore.get().getUsername());
            List<User> checkU = userAdminService.findUserByUserName(userStore.get().getUsername());
            if(checkU.isEmpty() && checkUApp.isEmpty() && checkUStore.isEmpty()){
                String passwordEncode =pe.encode(userStore.get().getPassword());
                userStore.get().setPassword(passwordEncode);
                //storeDao.save(userStore.get());
<<<<<<< HEAD
=======

>>>>>>> 242a2bc3c6643f2494ff010adb6694fa743e7158
                model.addAttribute("error", "Tài khoản hoặc  này đã được sử dụng");

                return "home/account/register";
            }
            model.addAttribute("error", "Tài khoản hoặc email này đã được sử dụng");
            return "home/account/register";
        }
        model.addAttribute("error", "Thiếu trường");

        return "home/account/register";
    }


}
