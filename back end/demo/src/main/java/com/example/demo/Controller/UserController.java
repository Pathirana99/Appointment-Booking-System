package com.example.demo.Controller;

import com.example.demo.Dto.AuthenticationResponse;
import com.example.demo.Dto.UserDto;
import com.example.demo.Dto.returnUserDto;
import com.example.demo.Service.UserService;
import com.example.demo.Utill.JwtUtill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    @PutMapping("/{id}")
    public ResponseEntity<String> changePassword(@PathVariable Integer id, @RequestBody Map<String, String> passwords) {
        try {
            boolean isUpdated = userService.changePassword(id, passwords.get("currentPassword"), passwords.get("newPassword"));
            if (isUpdated) {
                return ResponseEntity.ok("Password updated successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }



}