package com.ptit.csdlnc.model.response;

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
public class RouteResponse {
	private String maTuyen;
	private String diemKhoiHanh;
	private String diemDen;
	private Double khoangCach;
	private Integer thoiGianUocTinh;
	private Integer maLuongTuyen;
}
