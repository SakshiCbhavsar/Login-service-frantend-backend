package com.cdl.login.LoginService.repository;

import com.cdl.login.LoginService.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByEmail(String email);
    User save(User user);
    Optional<User> findByUsernameOrEmail(String username, String email);

    boolean existsByUsername(String username);
}
