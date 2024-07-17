package com.cdl.login.LoginService.service;

import com.cdl.login.LoginService.config.JwtTokenProvider;
import com.cdl.login.LoginService.dto.LoginDto;
import com.cdl.login.LoginService.model.Role;
import com.cdl.login.LoginService.model.User;
import com.cdl.login.LoginService.repository.RoleRepository;
import com.cdl.login.LoginService.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    private RoleRepository roleRepository;


    public AuthServiceImpl(
            JwtTokenProvider jwtTokenProvider,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();

        String token = jwtTokenProvider.generateToken(authentication, roles);

        return token;
    }

    @Override
    public User createUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
//
//        Optional<Role> roles = roleRepository.findByName("ROLE_USER");
//        if (roles != null) {
//            // If the role exists, use it
//            user.setRoles(Set.of());
//        } else {
//            // If the role doesn't exist, create it
//            Role newUserRole = new Role("ROLE_USER");
//            user.setRoles(Set.of(newUserRole));
//        }

        return userRepository.save(user);
    }
}