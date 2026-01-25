package com.ptit.csdlnc.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhanVien {
    private String maNv;
    private String hoTen;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate ngaySinh;
    private String gioiTinh; // ENUM('Nam', 'Nữ', 'Khác')
    private String chucVu; // ENUM('NhanVien', 'TruongPhong', 'PhoPhong')
    private BigDecimal bacLuong;
    private BigDecimal luongCoBan;
    private String maPhong;
}