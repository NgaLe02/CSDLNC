package com.ptit.csdlnc.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate ngayBatDau;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate ngayKetThucDuKien;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate ngayKetThucThucTe;
    private String ketQuaThucHien;
    private String trangThai;
}
