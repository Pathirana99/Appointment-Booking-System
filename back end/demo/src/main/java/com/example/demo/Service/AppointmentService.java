package com.example.demo.Service;

import com.example.demo.Dto.AppointmentDto;
import com.example.demo.Dto.AppointmentWithEmailDto;
import com.example.demo.Entity.Appointment;
import com.example.demo.Entity.User;
import com.example.demo.Repo.AppointmentRepo;
import com.example.demo.Repo.UserRepo;
import com.example.demo.Utill.SignUpMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    @Autowired
    AppointmentRepo appointmentRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    SignUpMail signUpMail;


    public AppointmentWithEmailDto saveAppointment(AppointmentWithEmailDto appointmentWithEmailDto, Integer userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Appointment appointment = new Appointment();
        appointment.setDate(appointmentWithEmailDto.getDate());
        appointment.setTime(appointmentWithEmailDto.getTime());
        appointment.setName(appointmentWithEmailDto.getName());
        appointment.setContact(appointmentWithEmailDto.getContact());
        appointment.setUser(user);

        appointment = appointmentRepo.save(appointment);
        appointmentWithEmailDto.setId(appointment.getId());
        try {
            signUpMail.sendAppointmentEmail(user.getEmail(), appointmentWithEmailDto);
        } catch (Exception e) {
            System.err.println("Failed to send appointment email: " + e.getMessage());
        }

        return appointmentWithEmailDto;
    }

    public List<AppointmentDto> getAppointment(Integer userId) {
        List<Appointment> appointments = appointmentRepo.findByUserId(userId);
        return appointments.stream()
                .map(appointment -> new AppointmentDto(
                        appointment.getId(),
                        appointment.getDate(),
                        appointment.getTime(),
                        appointment.getName(),
                        appointment.getContact()
                ))
                .collect(Collectors.toList());
    }

    public List<AppointmentDto> getAllAppointments() {
        List<Appointment> appointments = appointmentRepo.findAll();  // Fetching all appointments
        return appointments.stream()
                .map(appointment -> new AppointmentDto(
                        appointment.getId(),
                        appointment.getDate(),
                        appointment.getTime(),
                        appointment.getName(),
                        appointment.getContact()
                ))
                .collect(Collectors.toList());
    }

    public void deleteAppointment(Integer appointmentId) {
        if (!appointmentRepo.existsById(appointmentId)) {
            throw new RuntimeException("Appointment not found");
        }
        appointmentRepo.deleteById(appointmentId);
    }

}
