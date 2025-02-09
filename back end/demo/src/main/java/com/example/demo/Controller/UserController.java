package com.example.demo.Controller;

import com.example.demo.Dto.AuthenticationResponse;
import com.example.demo.Dto.UserDto;
import com.example.demo.Dto.returnUserDto;
import com.example.demo.Service.UserService;
import com.example.demo.Utill.JwtUtill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    private JwtUtill jwtUtil;


    @PostMapping("/save")
    public ResponseEntity<Object> saveUser(@RequestBody UserDto userDto) {
        returnUserDto savedUser = userService.saveUser(userDto);
        String jwt = jwtUtil.generateToken(
                new org.springframework.security.core.userdetails.User(savedUser.getEmail(), userDto.getPassword(), new ArrayList<>()),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getId(),
                savedUser.getUsername()
        );
        AuthenticationResponse authResponse = new AuthenticationResponse(jwt, savedUser.getRole());
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }
}