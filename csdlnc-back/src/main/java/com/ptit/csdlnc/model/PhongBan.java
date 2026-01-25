package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhongBan {
    private String maPhong;
    private String tenPhong;
    private String moTa;
    private Date ngayThanhLap;
}