package com.ptit.csdlnc.model.response;

import java.util.Date;

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
public class RegistrationExpiryResponse {
	private Integer maHanDangKiem;
	private String maXe;
	private Double chiPhi;
	private Date ngayDangKiem;
	private Long hieuLuc;
	
	private CarResponse xe;

}
