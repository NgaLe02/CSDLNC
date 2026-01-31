package com.ptit.csdlnc.model;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BacLuong {

    private String maBacLuong;
    private String tenBacLuong;
    private BigDecimal mucLuongCoBan;
}
