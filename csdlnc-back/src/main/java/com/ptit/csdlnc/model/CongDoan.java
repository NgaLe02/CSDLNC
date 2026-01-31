package com.ptit.csdlnc.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CongDoan {

    private int sttCongDoan;
    private String tenCongDoan;
    private Integer thuTu;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayBatDau;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayHoanThanhDuKien;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayHoanThanhThucTe;
    private String ketQua;
    private String trangThaiTienDo; // ENUM('DungHan', 'TreHan')
    private String maDuAn;

    private DuAn duAn;
}
