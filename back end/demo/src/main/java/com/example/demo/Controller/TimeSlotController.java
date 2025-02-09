package com.example.demo.Controller;

import com.example.demo.Dto.TimeSlotDto;
import com.example.demo.Dto.TimeSlotRemoveDto;
import com.example.demo.Entity.TimeSlot;
import com.example.demo.Service.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timeslot")
public class TimeSlotController {
    @Autowired
    private TimeSlotService service;

    @PostMapping("/create")
    public List<TimeSlot> createTimeSlots(@RequestBody TimeSlotDto timeSlotDto) {
        return service.createTimeSlots(timeSlotDto);
    }

    @GetMapping("/get")
    public List<TimeSlot> getAllTimeSlots() {
        return service.getAllTimeSlots();
    }


    @DeleteMapping("/delete")
    public String deleteTimeSlot(@RequestBody TimeSlotRemoveDto timeSlotRemoveDto) {
        service.deleteTimeSlot(timeSlotRemoveDto);
        return "Time slot deleted successfully";
    }

    @PostMapping("/add")
    public TimeSlot addTimeSlot(@RequestBody TimeSlotDto timeSlotDto) {
        return service.addTimeSlot(timeSlotDto);
    }
}
