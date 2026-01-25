package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhanVien {
    private String maNv;
    private String hoTen;
    private Date ngaySinh;
    private String gioiTinh; // ENUM('Nam', 'Nữ', 'Khác')
    private String chucVu; // ENUM('NhanVien', 'TruongPhong', 'PhoPhong')
    private Integer bacLuong;
    private BigDecimal luongCoBan;
    private String maPhong;
}