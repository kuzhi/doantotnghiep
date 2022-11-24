package fpoly.chickens.interceptor;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import fpoly.chickens.Implement.UserServiceImplement;
import fpoly.chickens.dao.UserAppDAO;
import fpoly.chickens.dao.UserRoleAppDAO;



@Configuration
@EnableWebSecurity
public class AuthConfig extends WebSecurityConfigurerAdapter{
	

	@Autowired
	BCryptPasswordEncoder pe;

	@Autowired
	UserRoleAppDAO userRoleDAO;

	@Autowired
	UserAppDAO ndDAO;

	@Autowired
	UserServiceImplement userService;
//
//	// mã hóa mật khẩu
	@Bean
	public BCryptPasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
//	
//	
	//	@Configuration
	//	@EnableWebSecurity
	//	@Order(1)
////	public class websecuroty extends WebSecurityConfigurerAdapter{
//	// cho phép request đến rest api từ browser
//	@Override
//	public void configure(WebSecurity web) throws Exception {
//		// TODO Auto-generated method stub
//		web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
//	}
////	
////		/*--Quản lý người dữ liệu người sử dụng--*/
//		@Override
//		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//			// TODO Auto-generated method stub
//			
//			
//			auth.userDetailsService(userService);
//			
//		}
//
//		@Bean
//		public AuthorizationRequestRepository<OAuth2AuthorizationRequest> getRepository() {
//			return new HttpSessionOAuth2AuthorizationRequestRepository();
//		}
//
//		@Bean
//		public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> getToken() {
//			return new DefaultAuthorizationCodeTokenResponseClient();
//		}
////
////		/*--Phân quyền sử dụng và hình thức đăng nhập--*/
////		
////		
//		@Override
//		protected void configure(HttpSecurity http) throws Exception {
//			// TODO Auto-generated method stub
//			// csrf, cors day la hai hinh thuc tan cong mang
//			http.csrf().disable().cors().disable();// tat hai hinh thuc nay de xac thuc quyen
//			// phân quyền sử dụng
//			 //http.authorizeRequests().anyRequest().permitAll(); 
//			
//
//			http.antMatcher("/home/account/**").authorizeRequests().antMatchers("/home/account/**").authenticated()
//					
//					.anyRequest().permitAll();
//	//
////			// Điều khiển lỗi truy cập không đúng vai trò
////			http.exceptionHandling().accessDeniedPage("/home/access/denied");
//	//
////			// Giao diện đăng nhập
////			
////			 
//			http.formLogin().loginPage("/home/auth/form").loginProcessingUrl("/home/account/auth/login")
//					.defaultSuccessUrl("/home/account/auth/success", true).failureUrl("/home/account/auth/login?error=Please login").usernameParameter("username")
//				.passwordParameter("password");
//			// remember me
//			http.rememberMe().rememberMeParameter("remember").tokenValiditySeconds(3600);
//
//			// Đăng xuất
//			//http.logout().logoutUrl("/auth/logoff")// dăng xuất
//					//.logoutSuccessUrl("/auth/logoff/success");
//
//			// dang nhap tu facebook va google
//			/*http.oauth2Login().loginPage("/auth/login/form").loginProcessingUrl("/auth/login")
//					.defaultSuccessUrl("/home/index", true).failureUrl("/auth/login/?error=error").authorizationEndpoint()
//					.baseUri("/oauth2/authorization").authorizationRequestRepository(getRepository()).and().tokenEndpoint()
//					.accessTokenResponseClient(getToken());*/
//
//		}
//	//}
	
	
	//@Configuration
	//@EnableWebSecurity
	
	//public class websecuroty2 extends WebSecurityConfigurerAdapter{
	// cho phép request đến rest api từ browser
		// cho phép request đến rest api từ browser
		@Override
		public void configure(WebSecurity web) throws Exception {
			// TODO Auto-generated method stub
			web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
		}
//
//		/*--Quản lý người dữ liệu người sử dụng--*/
		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			// TODO Auto-generated method stub
			
			/*auth.userDetailsService(username -> {try {
			
				NguoiDung sv = ndDAO.findById(username).get();
				System.out.println(username);
				System.err.println(sv.getEmail());
				
				String password = sv.getPassword();
				
				String[] role = sv.getUserRole().stream().map(au -> au.getRole().getId())
						.collect(Collectors.toList()).toArray(new String[0]);
				//this.setToken(username, password);
				return User.withUsername(username)
						.password(pe.encode(password))
						.roles(role).build();// luôn phải mã hóa mật khẩu 
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println(e);
				throw new UsernameNotFoundException(username + " not found");
				
			}});*/
			auth.userDetailsService(userService);
			
		}


		/*--Phân quyền sử dụng và hình thức đăng nhập--*/
		
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			// TODO Auto-generated method stub
			// csrf, cors day la hai hinh thuc tan cong mang
			http.csrf().disable().cors().disable();// tat hai hinh thuc nay de xac thuc quyen
			// phân quyền sử dụng
			 //http.authorizeRequests().anyRequest().permitAll(); 
			
	//
			http.antMatcher("/accout/**").authorizeRequests().antMatchers("/accout/all").authenticated()
			.antMatchers("/accout/view").hasRole("ADMIN").anyRequest().permitAll();
			
	//
//			// Điều khiển lỗi truy cập không đúng vai trò
//			//http.exceptionHandling().accessDeniedPage("/home/access/denied");
	//
//			// Giao diện đăng nhập
//			
			http.formLogin().loginPage("/user-app/auth/login").loginProcessingUrl("/user-app/auth/login")
			.defaultSuccessUrl("/home", false).failureUrl("/user-app/auth/login?error=Please login").usernameParameter("username")
			.passwordParameter("password");

			// remember me
			//http.rememberMe().rememberMeParameter("remember").tokenValiditySeconds(3600);

			// Đăng xuất
			//http.logout().logoutUrl("/auth/logoff")// dăng xuất
					//.logoutSuccessUrl("/auth/logoff/success");


			
	}

}
