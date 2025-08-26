package com.ptit.csdlnc.model.response;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RouteSalaryResponse {
	private Integer maLuongTuyen;
	private Integer doPhucTap;
	private Double khoangCachTu;
	private Double khoangCachDen;
	private Double luongCoBan;
	private Date ngayBatDau;
	
	private Date ngayKetThuc;
}
