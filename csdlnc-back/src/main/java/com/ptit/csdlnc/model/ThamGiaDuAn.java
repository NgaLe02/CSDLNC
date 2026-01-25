package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThamGiaDuAn {
    private String maNv;
    private String maDa;
    private String vaiTro; // ENUM('ThanhVien', 'ChuTri')
    private Integer thang;
    private Integer nam;
}