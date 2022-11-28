package fpoly.chickens.controller.account;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import fpoly.chickens.dao.StoreDAO;
import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserDAO;
import fpoly.chickens.dao.UserStoreDAO;
import fpoly.chickens.entity.User;
import fpoly.chickens.entity.UserApp;
import fpoly.chickens.entity.UserStore;
import fpoly.chickens.service.MailerService;
import fpoly.chickens.service.UserAdminKHService;
import fpoly.chickens.service.UserAdminNVService;
import fpoly.chickens.service.UserAdminService;


@Controller
@RequestMapping("home/forgot-password")
public class ForgotPassword {

    @Autowired
	MailerService mailer;

    @Autowired
    HttpSession session;

    @Autowired
	BCryptPasswordEncoder pe;

    @Autowired
    HttpServletRequest req;

   
    @Autowired
    UserAdminService userService;

    @Autowired
    UserAdminNVService userAppService;

    @Autowired
    UserAdminKHService userStoreService;

    @GetMapping("form")
    public String getForm(){

        return "home/account/forgot";
    }


    @PostMapping("check-info")
    public String chek(Model model){


        String username = req.getParameter("username");
        String email = req.getParameter("email");

        User users = userService.findUserByUsername(username);

        UserStore userStore = userStoreService.findUsersByUserName(username);

        UserApp userApp =  userAppService.findUsersByUserName(username);

        if(users !=null && !users.getDeleted() ){
            if(users.getEmail().equals(email)){
                session.setAttribute("emailCheck", email);
                session.setAttribute("usernameCheck", username);
                return "redirect:/home/forgot-password/change-password";
            }
        }

        if(userStore !=null && !userStore.getDeleted() ){
            if(userStore.getEmail().equals(email)){
                session.setAttribute("emailCheck", email);
                session.setAttribute("usernameCheck", username);
                return "redirect:/home/forgot-password/change-password";
            }
        }

        if(userApp != null && !userApp.getDeleted() ){
            if(userApp.getEmail().equals(email)){
                session.setAttribute("emailCheck", email);
                session.setAttribute("usernameCheck", username);
                return "redirect:/home/forgot-password/change-password";
            }
        }

        model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản không tồn tại");

        return "home/account/forgot";
    }

    @GetMapping("change-password")
    public String changePassword(){
        return "/home/account/sendMail";
    }


    @PostMapping("send-mail")
    public String sendMail(Model model){
        
        String password1 = req.getParameter("password1");
        
        //String password2 = req.getParameter("password2");
        String email = String.valueOf(session.getAttribute("emailCheck")) ;
        String username = String.valueOf(session.getAttribute("usernameCheck")) ;

        
      


        User users = userService.findUserByUsername(username);

        UserStore userStore = userStoreService.findUsersByUserName(username);

        UserApp userApp =  userAppService.findUsersByUserName(username);

        if(users !=null && !users.getDeleted() ){
            if(users.getEmail().equals(email)){
                users.setPassword(password1);
                userService.update(users);
                
            }
        }

        if(userStore !=null && !userStore.getDeleted() ){
            if(userStore.getEmail().equals(email)){
                userStore.setPassword(password1);
                userStoreService.update(userStore);
             
            }
        }

        if(userApp != null && !userApp.getDeleted() ){
            if(userApp.getEmail().equals(email)){
                userApp.setPassword(password1);
                userAppService.update(userApp);
               
            }
        }
        model.addAttribute("success", "gud");
        try {
            mailer.send(email, "[No-reply] Mật khẩu của bạn", "Đây là mật khẩu của bạn: " + password1 );
        
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return "/home/account/sendMail";
    }
}
