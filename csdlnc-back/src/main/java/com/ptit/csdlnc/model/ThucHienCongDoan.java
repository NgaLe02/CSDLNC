package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThucHienCongDoan {
    private String maNv;
    private String maCd;
    private String vaiTro; // ENUM('ThucHien', 'ChuTri')
    private String ketQua;
    private Boolean dungHan;
}