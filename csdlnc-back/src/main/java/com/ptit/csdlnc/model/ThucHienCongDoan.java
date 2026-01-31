package com.ptit.csdlnc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThucHienCongDoan {

    private int sttCongDoan;
    private String maDuAn;
    private String maNhanVien;
    private String vaiTro;
}
