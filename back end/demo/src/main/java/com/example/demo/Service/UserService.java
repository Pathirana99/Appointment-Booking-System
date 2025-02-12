package com.example.demo.Service;

import com.example.demo.Dto.UserDto;
import com.example.demo.Dto.returnUserDto;
import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;
import com.example.demo.Utill.SignUpMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SignUpMail signUpMail;

    public returnUserDto saveUser(UserDto userDto) {

        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        User user = userRepo.save(new User(userDto.getUsername(), userDto.getEmail(), userDto.getRole(), encodedPassword));

        try {
            signUpMail.sendEmail(userDto);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }

        return new returnUserDto(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }

    public boolean changePassword(Integer id, String currentPassword, String newPassword) {
        Optional<User> optionalUser = userRepo.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                throw new RuntimeException("Current password is incorrect.");
            }

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepo.save(user);
            return true;
        }
        return false;
    }

}
