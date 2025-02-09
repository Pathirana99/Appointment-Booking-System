package com.example.demo.Service;

import com.example.demo.Dto.AppointmentDto;
import com.example.demo.Entity.Appointment;
import com.example.demo.Entity.User;
import com.example.demo.Repo.AppointmentRepo;
import com.example.demo.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {
    @Autowired
    AppointmentRepo appointmentRepo;
    @Autowired
    UserRepo userRepo;

    public AppointmentDto saveAppointment(AppointmentDto appointmentDto, Integer userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Appointment appointment = new Appointment();
        appointment.setDate(appointmentDto.getDate());
        appointment.setTime(appointmentDto.getTime());
        appointment.setName(appointmentDto.getName());
        appointment.setContact(appointmentDto.getContact());
        appointment.setUser(user);

        appointment = appointmentRepo.save(appointment);
        appointmentDto.setId(appointment.getId());
        return appointmentDto;
    }
}
