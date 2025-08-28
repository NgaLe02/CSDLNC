package com.ptit.csdlnc.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
public class Trip {
	private String maChuyen;

	@NotNull(message = "Tình trạng chuyến không được null")
	@Pattern(regexp = "Chưa khởi hành|Đang chạy|Hoàn thành|Hủy", message = "Tình trạng chuyến không hợp lệ")
	private String tinhTrangChuyen;

	@NotNull(message = "Ngày giờ khởi hành không được null")
	private Date ngayGioKhoiHanh;

	@NotNull(message = "Ngày giờ đến không được null")
	private Date ngayGioDen;

	@NotNull(message = "Chi phí vận hành không được null")
	@DecimalMin(value = "0.0", inclusive = true, message = "Chi phí vận hành phải >= 0")
	private Double chiPhiVanHanh;

	@NotNull(message = "Tỉ lệ thù lao không được null")
	@DecimalMin(value = "0.0", message = "Tỉ lệ thù lao phải >= 0")
	@DecimalMax(value = "100.0", message = "Tỉ lệ thù lao phải <= 100")
	private Double tiLeThuLao;

	@NotNull(message = "Mã xe không được null")
	@Size(min = 3, max = 3, message = "Mã xe phải có đúng 3 ký tự")
	private String maXe;

	@NotNull(message = "Mã tuyến không được null")
	@Size(min = 4, max = 4, message = "Mã tuyến phải có đúng 4 ký tự")
	private String maTuyen;
}
