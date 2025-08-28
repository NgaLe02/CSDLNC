package com.ptit.csdlnc.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
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
public class Ticket {
	private String maVe;

	@NotBlank(message = "Ghế ngồi không được để trống")
	@Size(max = 10, message = "Ghế ngồi tối đa 10 ký tự")
	private String gheNgoi;

	@NotNull(message = "Mã hành khách không được null")
	@Positive(message = "Mã hành khách phải > 0")
	private Integer maHanhKhach;

	@NotBlank(message = "Mã chuyến không được trống")
	@Size(max = 4, message = "Mã chuyến tối đa 4 ký tự")
	private String maChuyen;

	@NotNull(message = "Ngày mua không được null")
	@PastOrPresent(message = "Ngày mua không được lớn hơn ngày hiện tại")
	private Date ngayMua;
}
