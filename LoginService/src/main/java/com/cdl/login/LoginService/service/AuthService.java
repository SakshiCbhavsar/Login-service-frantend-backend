package com.cdl.login.LoginService.service;


import com.cdl.login.LoginService.dto.LoginDto;
import com.cdl.login.LoginService.model.User;

import java.util.List;

public interface AuthService {
    String login(LoginDto loginDto);
    User createUser(User user);
    public List<User> getAllUsers();
}