package com.ptit.csdlnc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoaiCongViec {

    private String maLoaiCv;
    private String tenLoaiCongViec;
    private Integer mucLuongNangSuat;
}
