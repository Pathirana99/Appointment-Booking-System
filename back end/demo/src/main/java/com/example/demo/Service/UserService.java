package com.example.demo.Service;

import com.example.demo.Dto.UserDto;
import com.example.demo.Dto.returnUserDto;
import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;

    public returnUserDto saveUser(UserDto userDto) {
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        User user = userRepo.save(new User(userDto.getUsername(), userDto.getEmail(), userDto.getRole(), encodedPassword));
        return new returnUserDto(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }
}
