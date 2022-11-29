package fpoly.chickens.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig  implements WebMvcConfigurer{
	
	@Autowired
	AuthInterceptor auth;
	
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// TODO Auto-generated method stub
		registry.addInterceptor(auth)
				.addPathPatterns("/api/**","/deleted/**","/rest/**","/app/**","/assests/user_store/**","/home/cart/**","/home/client/**");

				
	}
	
	
}
