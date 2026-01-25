package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DuAn {
    private String maDa;
    private String tenDa;
    private String loaiDa;
    private Integer soNhanVienToiDa;
    private String maPhongQl;
    private String maNvChuTri;
    private Date ngayBatDau;
    private Date ngayKetThucDuKien;
    private String trangThai;
}