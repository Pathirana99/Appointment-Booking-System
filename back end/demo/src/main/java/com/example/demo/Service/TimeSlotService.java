package com.example.demo.Service;

import com.example.demo.Dto.TimeSlotDto;
import com.example.demo.Entity.TimeSlot;
import com.example.demo.Repo.TimeSlotRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TimeSlotService {
    @Autowired
    private TimeSlotRepo timeSlotRepo;

    @Transactional
    public List<TimeSlot> createTimeSlots(TimeSlotDto timeSlotDto) {
        List<TimeSlot> timeSlots = new ArrayList<>();
        LocalDate date = timeSlotDto.getDate();
        Time current = timeSlotDto.getStartTime();
        Time endTime = timeSlotDto.getEndTime();

        while (current.before(endTime)) {
            TimeSlot slot = new TimeSlot();
            slot.setDate(date);
            slot.setStartTime(current);
            timeSlots.add(slot);

            long newTimeInMs = current.getTime() + (15 * 60 * 1000);
            current = new Time(newTimeInMs);
        }

        return timeSlotRepo.saveAll(timeSlots);
    }

    public List<TimeSlot> getAllTimeSlots(LocalDate date) {
        return timeSlotRepo.findAllByDateOrderByStartTimeAsc(date);
    }

    @Transactional
    public void deleteTimeSlot(LocalDate date, Time startTime) {
        timeSlotRepo.deleteByDateAndStartTime(date, startTime);
    }
}
