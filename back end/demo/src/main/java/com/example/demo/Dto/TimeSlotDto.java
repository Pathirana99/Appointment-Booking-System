package com.example.demo.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TimeSlotDto {
    private Integer id;
    private LocalDate date;
    private Time startTime;
    private Time endTime;
}
