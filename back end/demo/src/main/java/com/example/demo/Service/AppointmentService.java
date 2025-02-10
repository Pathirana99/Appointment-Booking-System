package com.example.demo.Service;

import com.example.demo.Dto.AppointmentDto;
import com.example.demo.Entity.Appointment;
import com.example.demo.Entity.User;
import com.example.demo.Repo.AppointmentRepo;
import com.example.demo.Repo.UserRepo;
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
}
