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
public class Season {
	private String maMua;

	@NotNull(message = "Tên mùa không được null")
	@NotBlank(message = "Tên mùa không được để trống")
	@Size(max = 50, message = "Tên mùa tối đa 50 ký tự")
	private String tenMua;

}
