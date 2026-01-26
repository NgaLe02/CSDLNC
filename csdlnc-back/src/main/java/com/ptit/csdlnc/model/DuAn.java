package com.ptit.csdlnc.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate ngayBatDau;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate ngayKetThucDuKien;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date ngayKetThucThucTe;
    private LocalDate ketQuaThucHien;
    private String trangThai;

    private List<ThamGiaDuAn> thamGiaLst; 
}
