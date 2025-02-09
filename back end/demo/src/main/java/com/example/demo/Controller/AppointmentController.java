package com.example.demo.Controller;

import com.example.demo.Dto.AppointmentDto;
import com.example.demo.Service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
    @Autowired
    AppointmentService service;

    @PostMapping("/save/{userId}")
    public AppointmentDto saveAppointment(@PathVariable Integer userId, @RequestBody AppointmentDto appointmentDto) {
        return service.saveAppointment(appointmentDto, userId);
    }
}
