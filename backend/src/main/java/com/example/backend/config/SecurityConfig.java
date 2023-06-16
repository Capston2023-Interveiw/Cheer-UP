package com.example.backend.config;

<<<<<<< HEAD
import com.example.backend.jwt.*;
=======
import com.example.backend.member.jwt.JwtAccessDeniedHandler;
import com.example.backend.member.jwt.JwtAuthenticationEntryPoint;
import com.example.backend.member.jwt.JwtTokenProvider;
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
<<<<<<< HEAD
import com.example.backend.jwt.JwtAuthenticationFilter;
=======
import com.example.backend.member.jwt.JwtAuthenticationFilter;
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf().disable();
    }
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
<<<<<<< HEAD
                .antMatchers("/api/v1/members/account/").permitAll()
                .antMatchers("/api/v1/members/login/").permitAll()
=======
                .antMatchers("/api/v1/members/account").permitAll()
                .antMatchers("/api/v1/members/login").permitAll()
                .antMatchers("/api/v1/members/account/").permitAll()
                .antMatchers("/api/v1/members/login/").permitAll()
                .antMatchers("/swagger-ui/**").permitAll()
                .antMatchers("/v3/api-docs").permitAll()
                .antMatchers("/swagger-resources/**").permitAll()
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898
                .antMatchers("/api/v1/members/test").hasRole("USER")
                .anyRequest().authenticated()
                .and()
                // Exception Handling
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}