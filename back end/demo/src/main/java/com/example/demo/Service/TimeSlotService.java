package com.example.demo.Service;

import com.example.demo.Dto.TimeSlotDto;
import com.example.demo.Dto.TimeSlotRemoveDto;
import com.example.demo.Entity.TimeSlot;
import com.example.demo.Repo.AppointmentRepo;
import com.example.demo.Repo.TimeSlotRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Service
public class TimeSlotService {
    @Autowired
    private TimeSlotRepo timeSlotRepo;
    @Autowired
    private AppointmentRepo appointmentRepo;

    public List<TimeSlot> createTimeSlots(TimeSlotDto timeSlotDto) {
        List<TimeSlot> timeSlots = new ArrayList<>();
        Time current = timeSlotDto.getStartTime();
        Time endTime = timeSlotDto.getEndTime();

        while (current.before(endTime)) {
            TimeSlot slot = new TimeSlot();
            slot.setStartTime(current);
            timeSlots.add(slot);

            // Add 15 minutes
            long newTimeInMs = current.getTime() + (15 * 60 * 1000);
            current = new Time(newTimeInMs);
        }

        return timeSlotRepo.saveAll(timeSlots);
    }

    public List<TimeSlot> getAllTimeSlots() {
        // Fetching all time slots sorted by startTime in ascending order
        return timeSlotRepo.findAllBy();
    }


    @Transactional // Add this annotation
    public void deleteTimeSlot(TimeSlotRemoveDto timeSlotRemoveDto) {
        Time startTime = timeSlotRemoveDto.getStartTime();
        timeSlotRepo.deleteByStartTime(startTime);
    }

    public TimeSlot addTimeSlot(TimeSlotDto timeSlotDto) {
        TimeSlot slot = new TimeSlot();
        slot.setStartTime(timeSlotDto.getStartTime());
        return timeSlotRepo.save(slot);
    }
}
