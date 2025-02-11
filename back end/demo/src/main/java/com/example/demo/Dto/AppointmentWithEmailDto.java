package com.example.demo.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppointmentWithEmailDto {
    private Integer id;
    private String date;
    private Time time;
    private String name;
    private Long contact;
}
