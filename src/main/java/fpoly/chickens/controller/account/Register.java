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
    HttpServletRequest req;

    @Autowired
    UserAdminService userAdminService ;

    @Autowired
    UserAdminKHService userAdminKHService ;

    @Autowired
    UserAdminNVService userAdminNVService ;

    @GetMapping("form")
    public String getForm(Model model){
        model.addAttribute("user", new User());
        return "home/account/register";
    }

    @PostMapping("create")
    public String createNew(Model model, @ModelAttribute Optional<User> user){
        model.addAttribute("user", user);
        if(user.isPresent()){
            //model.addAttribute("error", "user");
            List<UserStore> checkUStore = userAdminKHService.findUserByUserName(user.get().getUsername());
            List<UserApp> checkUApp = userAdminNVService.findUserByUserName(user.get().getUsername());
            List<User> checkU = userAdminService.findUserByUserName(user.get().getUsername());
            if(checkU.isEmpty() && checkUApp.isEmpty() && checkUStore.isEmpty()){
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


}
