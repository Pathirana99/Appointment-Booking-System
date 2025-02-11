package com.example.demo.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Time;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppointmentDto {
    private Integer id;
    private String date;
    private Time time;
    private String name;
    private Long contact;
}
