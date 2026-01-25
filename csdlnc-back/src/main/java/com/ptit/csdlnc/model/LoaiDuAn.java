package com.ptit.csdlnc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoaiDuAn {

    private String maLoaiDuAn;
    private String tenLoaiDuAn;
    private Integer soNvToiDa;
    private String moTa;
}