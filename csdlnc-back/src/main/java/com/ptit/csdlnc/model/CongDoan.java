package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CongDoan {
    private String maCd;
    private String tenCongDoan;
    private Integer thuTu;
    private Date ngayBatDau;
    private Integer soNgayHoanThanh;
    private Date ngayHoanThanhThucTe;
    private String ketQua;
    private String trangThaiTienDo; // ENUM('DungHan', 'TreHan')
    private String maDa;
}