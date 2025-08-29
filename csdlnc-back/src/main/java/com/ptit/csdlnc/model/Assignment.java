package com.ptit.csdlnc.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Assignment {

	@NotNull(message = "Nhân viên không được null")
	@NotBlank(message = "Nhân viên không được để trống")
	@Size(max = 4, message = "Mã nhân viên tối đa 4 ký tự")
	private Integer maNhanVien;

	@NotNull(message = "Chuyến không được null")
	@NotBlank(message = "Chuyến không được để trống")
	@Size(max = 4, message = "Mã chuyến tối đa 4 ký tự")
	private String maChuyen;

	@NotNull(message = "Tuyến đường không được null")
	@NotBlank(message = "Tuyến đường không được để trống")
	@Size(max = 4, message = "Mã tuyến đường tối đa 4 ký tự")
	private String maTuyen;

	@NotNull(message = "Xe không được null")
	@NotBlank(message = "xe không được để trống")
	@Size(max = 3, message = "Mã xe tối đa 3 ký tự")
	private String maXe;

	@NotNull(message = "Vai trò không được null")
	@NotBlank(message = "Vai trò không được để trống")
	private String vaiTro;

}
