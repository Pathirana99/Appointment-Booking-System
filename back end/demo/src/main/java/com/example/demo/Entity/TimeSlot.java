package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;

@Entity
@Table(name = "time_slots")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Time startTime;
}
