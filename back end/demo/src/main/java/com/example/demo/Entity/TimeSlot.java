package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Time startTime;
}
