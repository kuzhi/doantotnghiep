package fpoly.chickens.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;

import fpoly.chickens.service.SessionService;


@Service
public class AuthInterceptor implements HandlerInterceptor{

	@Autowired
	SessionService session;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
		
		String uri = request.getRequestURI();
		//lay account tu session
		String user = session.get("tokenUser");
		String store = session.get("tokenStore");
		
		String errorAuth = "";
		if(user == null && store == null) {
			//khi chua dang nhap
			errorAuth = "Not Logged In";
		}
		else if(user !=null && (uri.startsWith("/app") || uri.startsWith( "/app/sales-method"))){
			//khong dung vai tro admin
			errorAuth= "Access is denied";
			
		}
		if(errorAuth.length()>0) {
			// co loi
			session.set("errorAuth", errorAuth);
			response.sendRedirect("/home/auth/login?error=" + errorAuth);
			return false;
		}
		
		return true;
	}
}
