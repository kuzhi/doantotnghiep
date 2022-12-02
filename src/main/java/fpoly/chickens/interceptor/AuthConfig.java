package fpoly.chickens.interceptor;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import fpoly.chickens.Implement.UserServiceImplement;
import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserRoleAppDAO;
import fpoly.chickens.service.UserService;



@Configuration
@EnableWebSecurity
public class AuthConfig extends WebSecurityConfigurerAdapter{
	
	@Bean
	public BCryptPasswordEncoder getPasswordEncoder2() {
		
		return new BCryptPasswordEncoder();
	}
	
	@Autowired
	UserRoleAppDAO userRoleDAO;

	@Autowired
	UserAppDAO ndDAO;

	@Autowired
	UserService userService;


				
			
		//	// mã hóa mật khẩu
	
		@Override
		public void configure(WebSecurity web) throws Exception {
//			// TODO Auto-generated method stub
			web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
		}
////
////		/*--Quản lý người dữ liệu người sử dụng--*/
		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			
			auth.userDetailsService(userService);
//			
		}
//
//
//		/*--Phân quyền sử dụng và hình thức đăng nhập--*/
//		
//		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
//			// TODO Auto-generated method stub
			// csrf, cors day la hai hinh thuc tan cong mang
			http.csrf().disable().cors().disable();// tat hai hinh thuc nay de xac thuc quyen
//			// phân quyền sử dụng
			 //http.authorizeRequests().anyRequest().permitAll(); 
//			
//	//		
			http.authorizeRequests().antMatchers("/admin/**").authenticated()
				.antMatchers("/admin/report","/assets/admin/**").hasRole("ADMIN")
				.antMatchers("/admin/**","/api/authorities").hasAnyRole("STAFF","ADMIN")
				.anyRequest().permitAll();
//	//
////			// Điều khiển lỗi truy cập không đúng vai trò
				//http.exceptionHandling().accessDeniedPage("/home/access/denied");
//	//
////			// Giao diện đăng nhập
////		
			
			http.formLogin().loginPage("/user-app/auth/form").loginProcessingUrl("/user-app/auth/login")
			.defaultSuccessUrl("/user-app/auth/success", false).failureUrl("/user-app/auth/error").usernameParameter("username")
			.passwordParameter("password");

			
		
			// remember me
			http.rememberMe().rememberMeParameter("remember").tokenValiditySeconds(3600);

			// Đăng xuất
			http.logout().logoutUrl("/user-app/logoff")// dăng xuất
					.logoutSuccessUrl("/user-app/auth/form");






		}
 	
}
