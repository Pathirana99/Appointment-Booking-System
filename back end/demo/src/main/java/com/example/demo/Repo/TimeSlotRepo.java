package com.example.demo.Repo;

import com.example.demo.Entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeSlotRepo extends JpaRepository<TimeSlot, Integer> {
}
