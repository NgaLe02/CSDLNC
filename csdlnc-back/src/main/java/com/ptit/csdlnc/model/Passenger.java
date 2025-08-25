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
public class Passenger {
	private Integer maHanhKhach;

	@NotNull(message = "Họ tên không được null")
	@NotBlank(message = "Họ tên không được để trống")
	@Size(max = 100, message = "Tên loại xe tối đa 100 ký tự")
	private String hoTen;
	
	@Size(max = 20, message = "Chứng minh nhân dân tối đa 20 ký tự")
	private String cmnd;
	
	@Size(max = 20, message = "Số điện thoại tối đa 20 ký tự")
	private String soDienThoai;
}
