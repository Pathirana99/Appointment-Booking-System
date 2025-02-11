package com.example.demo.Controller;

import com.example.demo.Dto.AuthenticationRequest;
import com.example.demo.Dto.AuthenticationResponse;
import com.example.demo.Entity.User;
import com.example.demo.Service.LoginService;
import com.example.demo.Utill.JwtUtill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/loginUser")
public class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtill jwtUtil;

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            final UserDetails userDetails = loginService.loadUserByUsername(request.getEmail());
            User user = loginService.findByEmail(request.getEmail());

            final String jwt = jwtUtil.generateToken(userDetails, user.getEmail(), user.getRole(), user.getId(), user.getUsername());

            AuthenticationResponse authResponse = new AuthenticationResponse(jwt, user.getRole());
            return ResponseEntity.ok(authResponse);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authentication failed: Bad credentials");
        }
    }
}
