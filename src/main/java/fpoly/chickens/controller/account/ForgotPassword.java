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

    @GetMapping("form-client")
    public String getFormClient(){

        return "home/account/forgotClient";
    }

    @GetMapping("form-app")
    public String getFormApp(){

        return "home/account/forgotApp";
    }

    @PostMapping("check-info-client")
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
                return "redirect:/home/forgot-password/change-password-client";
            }
        }

        if(userStore !=null && !userStore.getDeleted() ){
            if(userStore.getEmail().equals(email)){
                session.setAttribute("emailCheck", email);
                session.setAttribute("usernameCheck", username);
                return "redirect:/home/forgot-password/change-password-client";
            }
        }

        if(userApp != null && !userApp.getDeleted() ){
            if(userApp.getEmail().equals(email)){
                model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản không tồn tại");

                return "home/account/forgotClient";
            }
        }

        model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản không tồn tại");

        return "home/account/forgotClient";
    }

    @PostMapping("check-info-app")
    public String chekApp(Model model){


        String username = req.getParameter("username");
        String email = req.getParameter("email");

        User users = userService.findUserByUsername(username);

        UserStore userStore = userStoreService.findUsersByUserName(username);

        UserApp userApp =  userAppService.findUsersByUserName(username);

        if(users !=null && !users.getDeleted() ){
            if(users.getEmail().equals(email)){
                model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản không tồn tại");

        return "home/account/forgotApp";
            }
        }

        if(userStore !=null && !userStore.getDeleted() ){
            if(userStore.getEmail().equals(email)){
                model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản không tồn tại");

                return "home/account/forgotApp";
            }
        }

        if(userApp != null && !userApp.getDeleted() ){
            if(userApp.getEmail().equals(email)){
                session.setAttribute("emailCheck", email);
                session.setAttribute("usernameCheck", username);
                return "redirect:/home/forgot-password/change-password-app";
            }
        }

        model.addAttribute("message", "Sai tài khoản, mật khẩu hoặc tài khoản không tồn tại");

        return "home/account/forgotApp";
    }

    @GetMapping("change-password-client")
    public String changePasswordClient(){
        return "/home/account/sendMailClient";
    }
    @GetMapping("change-password-app")
    public String changePasswordApp(){
        return "/home/account/sendMailApp";
    }

    @PostMapping("send-mail-app")
    public String sendMailApp(Model model){
        
        String password1 = req.getParameter("password1");
        //String password2 = req.getParameter("password2");
        String email = String.valueOf(session.getAttribute("emailCheck")) ;
        String username = String.valueOf(session.getAttribute("usernameCheck")) ;

     

        UserApp userApp =  userAppService.findUsersByUserName(username);


        if(userApp != null && !userApp.getDeleted() ){
            if(userApp.getEmail().equals(email)){
                userApp.setPassword(password1);
                userAppService.update(userApp);
               
            }
        }
        model.addAttribute("success", "Mật khẩu đã được thay đổi!");
        try {
            mailer.send(email, "[No-reply] Mật khẩu của bạn", "Đây là mật khẩu mới của bạn "+ username+ ": " + password1 );
        
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return "/home/account/sendMailApp";
    }

    @PostMapping("send-mail-client")
    public String sendMailClient(Model model){
        
        String password1 = req.getParameter("password1");
       
        //String password2 = req.getParameter("password2");
        String email = String.valueOf(session.getAttribute("emailCheck")) ;
        String username = String.valueOf(session.getAttribute("usernameCheck")) ;

        User users = userService.findUserByUsername(username);

        UserStore userStore = userStoreService.findUsersByUserName(username);


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

       
        model.addAttribute("success", "Mật khẩu đã được thay đổi!");
        try {
            mailer.send(email, "[No-reply] Mật khẩu của bạn", "Đây là mật khẩu mới của bạn "+ username+ ": " + password1 );
        
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return "/home/account/sendMailClient";
    }
}
