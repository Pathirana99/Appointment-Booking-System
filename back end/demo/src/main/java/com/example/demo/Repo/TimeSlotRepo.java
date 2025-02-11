package com.example.demo.Repo;

import com.example.demo.Entity.TimeSlot;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;

public interface TimeSlotRepo extends JpaRepository<TimeSlot, Integer> {
    @Modifying
    @Transactional
    void deleteByDateAndStartTime(LocalDate date, Time startTime);
    List<TimeSlot> findAllByDateOrderByStartTimeAsc(LocalDate date);

    List<TimeSlot> findAllByOrderByDateAscStartTimeAsc();
}
