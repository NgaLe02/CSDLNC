package com.ptit.csdlnc.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DuAn {

    private String maDuAn;
    private String tenDuAn;
    private String maLoaiDuAn;
    private String maPhongQuanLy;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayBatDau;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayKetThucDuKien;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayKetThucThucTe;
    private String trangThai;
    private String luongTrachNhiem;

    private LoaiDuAn loaiDuAn;
    private PhongBan phongQuanLy;
    private List<ThamGiaDuAn> thamGiaLst;
}
