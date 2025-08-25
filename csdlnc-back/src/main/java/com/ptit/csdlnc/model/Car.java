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
public class Car {
	private String maXe;
	
	@NotNull(message = "Biển số xe không được null")
	@NotBlank(message = "Biển số xe không được để trống")
	@Size(max = 20, message = "Biển số xe tối đa 20 ký tự")
	private String bienSo;
	
	private String tinhTrang;
	
	@NotNull(message = "Loại xe không được để trống")
	private Integer maLoaiXe;

}
