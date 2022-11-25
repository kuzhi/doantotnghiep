package fpoly.chickens.api;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class AuthenticationAPI {
	@RequestMapping(value = "/api/get", method = RequestMethod.GET, headers="Accept=*/*")
	public @ResponseBody Object showMenu(HttpSession session) {
	    String  tokenStore =  (String) session.getAttribute("tokenStore");

	    return tokenStore ;
	}
}
