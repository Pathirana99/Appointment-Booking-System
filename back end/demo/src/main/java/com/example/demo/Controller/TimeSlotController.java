package com.example.demo.Controller;

import com.example.demo.Dto.TimeSlotDto;
import com.example.demo.Entity.TimeSlot;
import com.example.demo.Service.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/timeslot")
public class TimeSlotController {
    @Autowired
    private TimeSlotService service;

    @PostMapping("/create")
    public List<TimeSlot> createTimeSlots(@RequestBody TimeSlotDto timeSlotDto) {
        return service.createTimeSlots(timeSlotDto);
    }

    @GetMapping("/get/{date}")
    public List<TimeSlot> getAllTimeSlots(@PathVariable LocalDate date) {
        return service.getAllTimeSlots(date);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteTimeSlot(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam Time startTime) {
        service.deleteTimeSlot(date, startTime);
        return ResponseEntity.ok("Time slot deleted successfully");
    }

}
