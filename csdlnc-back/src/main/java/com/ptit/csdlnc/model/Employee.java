package com.ptit.csdlnc.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
public class Employee {
	private Integer maNhanVien;

	@NotNull(message = "Họ tên không được null")
	@NotBlank(message = "Họ tên không được để trống")
	@Size(max = 100, message = "Tên loại xe tối đa 100 ký tự")
	private String hoTen;
	
	@Size(max = 12, message = "Chứng minh nhân dân tối đa 20 ký tự")
	private String cmnd;

}
