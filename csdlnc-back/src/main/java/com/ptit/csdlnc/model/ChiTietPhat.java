package com.ptit.csdlnc.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietPhat {
    private Integer maPhat;
    private Integer maBangLuong;
    private String lyDo;
    private BigDecimal tyLePhat;
    private BigDecimal soTienPhat;
}