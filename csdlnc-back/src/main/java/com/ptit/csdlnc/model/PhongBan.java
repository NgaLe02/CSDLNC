package com.ptit.csdlnc.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhongBan {

    private String maPhong;
    private String tenPhong;
    private String moTa;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate ngayThanhLap;
}
