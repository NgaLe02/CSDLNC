package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BangLuong {
    private Integer maBangLuong;
    private String maNv;
    private Integer thang;
    private Integer nam;
    private BigDecimal luongCung;
    private BigDecimal luongTrachNhiem;
    private BigDecimal luongNangSuat;
    private BigDecimal tongTienPhat;
    private BigDecimal tongLuong;
}