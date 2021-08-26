package com.example.dongho.config;


//import com.example.dongho.UserDetail;
import com.example.dongho.entity.Role;
import com.example.dongho.filter.JwtFilter;
import com.example.dongho.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.BeanDefinitionDsl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.InMemoryTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserServices userServices;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
//        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userServices);
//        auth.inMemoryAuthentication().withUser("qquach").password("123").roles("Admin");
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    private CsrfTokenRepository csrfTokenRepository(){
        CookieCsrfTokenRepository csrfTokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
//        csrfTokenRepository.setCookiePath();
        csrfTokenRepository.setCookieHttpOnly(false);
        return csrfTokenRepository;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors().and().csrf()
                .csrfTokenRepository(csrfTokenRepository())
//                .requireCsrfProtectionMatcher()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED);
//                .and().addFilterAfter(new CsrfFilter(), CsrfFilter.class);
//        http.headers().frameOptions().sameOrigin().contentSecurityPolicy("default-src 'seft', script-src 'seft'");
//        http.headers().frameOptions().sameOrigin().contentSecurityPolicy("frame-ancestors 'self'");
        http.headers().frameOptions().deny();

        http.csrf().disable().authorizeRequests().antMatchers(  "/api/public/**").permitAll();
        http.csrf().disable().authorizeRequests().antMatchers(  "/api/public/user/get").hasAnyAuthority("Customer", "Admin", "Staff");
        http.csrf().disable().authorizeRequests().antMatchers(  "/api/private/user/deleteuserbyid").hasAuthority("Admin");
        http.csrf().disable().authorizeRequests().antMatchers( "/api/private/**").permitAll()
                                                .antMatchers( "/api/private/product/**").hasAnyAuthority("Admin", "Staff")
                                                .antMatchers( "/api/private/admin/m_order/**").hasAuthority("Admin")
                .anyRequest().authenticated()
                .and().exceptionHandling().and().sessionManagement().sessionFixation().changeSessionId()
                .maximumSessions(5).maxSessionsPreventsLogin(true)
                .and()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/403");
        http.authorizeRequests().and()
                .rememberMe().tokenRepository(this.persistentTokenRepository())
                .tokenValiditySeconds(1 * 24 * 60 * 60);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        InMemoryTokenRepositoryImpl memory = new InMemoryTokenRepositoryImpl();
        return memory;
    }
}
