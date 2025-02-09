package com.example.demo.Repo;

import com.example.demo.Entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {
    List<Appointment> findByUserId(Integer userId);
}
