package com.example.demo.Utill;

import com.example.demo.Dto.AppointmentWithEmailDto;
import com.example.demo.Dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class SignUpMail {

    @Autowired
    private JavaMailSender mailSender;

    public String sendEmail(UserDto loginUserDto) {
        try {
            SimpleMailMessage signMessage = new SimpleMailMessage();
            signMessage.setSubject("Welcome to Appointment Booking System!");
            signMessage.setTo(loginUserDto.getEmail());
            signMessage.setFrom("sunithkaushalya.pp@gmail.com"); // Ensure this matches your SMTP config
            signMessage.setText("Hello " + loginUserDto.getUsername() + ",\n\n"
                    + "Congratulations! You have successfully registered on us.\n\n"
                    + "Best Regards,\nTeam");

            mailSender.send(signMessage);
            return "Email sent successfully";
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            return "Failed to send email";
        }
    }

}
