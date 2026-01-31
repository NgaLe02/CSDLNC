package com.ptit.csdlnc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThamGiaDuAn {

    private String maNv;
    private String maDa;
    private String vaiTro; // ENUM('ThanhVien', 'ChuTri')
    private Integer thang;
    private Integer nam;

    private NhanVien nhanVien;
}
