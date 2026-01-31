package com.ptit.csdlnc.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhanVien {

    private String maNhanVien;
    private String hoTen;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngaySinh;
    private String gioiTinh; // 'Nam','Nu','Khac'
    private Boolean hoatDong;

    private ChucVu phanCong;
    private XepBacLuong xepBacLuong;
}
