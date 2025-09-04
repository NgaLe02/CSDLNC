package com.ptit.csdlnc.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

	@NotNull(message = "Hiệu lực không được null")
	private Long hieuLuc;
}
