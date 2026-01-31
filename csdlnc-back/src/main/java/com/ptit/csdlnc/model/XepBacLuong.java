package com.ptit.csdlnc.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class XepBacLuong {

    private String maNhanVien;
    private String maBacLuong;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayApDung;

    private BacLuong bacLuong;
}
