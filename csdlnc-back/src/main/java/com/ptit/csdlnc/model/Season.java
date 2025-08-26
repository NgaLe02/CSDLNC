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
public class Season {
	private Integer maMua;

	@NotNull(message = "Tên mùa không được null")
	@NotBlank(message = "Tên mùa không được để trống")
	@Size(max = 50, message = "Tên mùa tối đa 50 ký tự")
	private String tenMua;

}
