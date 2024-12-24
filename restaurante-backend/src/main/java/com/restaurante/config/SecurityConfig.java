package com.restaurante.config;

import com.restaurante.security.CustomUserDetailsService;
import com.restaurante.security.JwtAuthenticationEntryPoint;
import com.restaurante.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig {

  @Autowired
  CustomUserDetailsService customUserDetailsService;

  @Autowired
  private JwtAuthenticationEntryPoint unauthorizedHandler;

  @Bean
  public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
      throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector introspector) {
    return new MvcRequestMatcher.Builder(introspector);
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http, MvcRequestMatcher.Builder mvc) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .exceptionHandling(exceptions -> exceptions
            .authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(mvc.pattern("/")).permitAll()
            .requestMatchers(mvc.pattern("/favicon.ico")).permitAll()
            .requestMatchers(mvc.pattern("/**/*.png")).permitAll()
            .requestMatchers(mvc.pattern("/**/*.gif")).permitAll()
            .requestMatchers(mvc.pattern("/**/*.svg")).permitAll()
            .requestMatchers(mvc.pattern("/**/*.jpg")).permitAll()
            .requestMatchers(mvc.pattern("/**/*.html")).permitAll()
            .requestMatchers(mvc.pattern("/**/*.css")).permitAll()
            .requestMatchers(mvc.pattern("/**/*.js")).permitAll()
            .requestMatchers(mvc.pattern("/api/auth/**")).permitAll()
            .requestMatchers(mvc.pattern("/api/menu/**")).permitAll() // Permitir acesso ao endpoint de menu
            .requestMatchers(mvc.pattern("/api/user/checkUsernameAvailability")).permitAll()
            .requestMatchers(mvc.pattern("/api/user/checkEmailAvailability")).permitAll()
            .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/polls/**")).permitAll()
            .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/users/**")).permitAll()
            .anyRequest().authenticated());

    http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
