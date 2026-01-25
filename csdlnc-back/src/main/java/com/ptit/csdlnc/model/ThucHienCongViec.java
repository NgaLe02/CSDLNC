package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThucHienCongViec {
    private String maNv;
    private String maCv;
    private Integer thang;
    private Integer nam;
    private String ketQua;
    private Boolean dungHan;
}