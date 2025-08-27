package com.ptit.csdlnc.model;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
public class RegistrationExpiry {
	private Integer maHanDangKiem;

	@NotNull(message = "Mã xe không được null")
	@NotBlank(message = "Mã xe không được để trống")
	private String maXe;

	@NotNull(message = "Chi phí không được null")
	private Double chiPhi;

	@NotNull(message = "Ngày đăng kiểm không được null")
	private Date ngayDangKiem;

}
