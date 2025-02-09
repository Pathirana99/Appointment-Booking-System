package com.example.demo.Dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class returnUserDto {
    private Integer id;
    private String username;
    private String email;
    private String role;

    public returnUserDto(Integer id, String username, String email, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}
