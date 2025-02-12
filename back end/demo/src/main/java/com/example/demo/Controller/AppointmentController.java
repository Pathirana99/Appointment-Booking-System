package com.example.demo.Controller;

import com.example.demo.Dto.AppointmentDto;
import com.example.demo.Dto.AppointmentWithEmailDto;
import com.example.demo.Service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/appointment")
public class AppointmentController {
    @Autowired
    AppointmentService service;

    @PostMapping("/save/{userId}")
    public AppointmentWithEmailDto saveAppointment(@PathVariable Integer userId, @RequestBody AppointmentWithEmailDto appointmentWithEmailDto) {
        return service.saveAppointment(appointmentWithEmailDto, userId);
    }

    @GetMapping("/user/{userId}")
    public List<AppointmentDto> getAppointmentsByUserId(@PathVariable Integer userId) {
        return service.getAppointment(userId);
    }

    @GetMapping("/all")
    public List<AppointmentDto> getAllAppointments() {
        return service.getAllAppointments();
    }

    @DeleteMapping("/delete/{appointmentId}")
    public void deleteAppointment(@PathVariable Integer appointmentId) {
        service.deleteAppointment(appointmentId);
    }

}
