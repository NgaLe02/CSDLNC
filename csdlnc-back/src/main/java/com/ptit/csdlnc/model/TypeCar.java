package com.ptit.csdlnc.model;

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
public class TypeCar {
	private Integer maLoaiXe;

//	@NotNull(message = "Tên loại xe không được null")
//	@NotBlank(message = "Tên loại xe không được để trống")
//	@Size(max = 50, message = "Tên loại xe tối đa 50 ký tự")
	private String tenLoaiXe;

//	@NotNull(message = "Số ghế không được để trống")
//	@Min(value = 1, message = "Số ghế phải lớn hơn 0")
	private Integer soGhe;
}
