package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CongViec {
    private String maCv;
    private String tenCv;
    private String loaiCv;
    private BigDecimal mucLuongNangSuat;
}