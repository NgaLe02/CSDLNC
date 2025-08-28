package com.ptit.csdlnc.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotNull;
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
public class TicketPrice {
	private Integer maGiaVe;

	@NotNull(message = "Giá vé không được null")
	@Positive(message = "Giá vé phải lớn hơn 0")
	private Double giaVe;

	@NotNull(message = "Mã tuyến không được null")
	@Size(max = 4, message = "Mã tuyến tối đa 4 ký tự")
	private String maTuyen;

	@NotNull(message = "Mã mùa không được null")
	private Integer maMua;
	
	@NotNull(message = "Ngày bắt đầu không được null")
	private Date ngayBatDau;
	
	private Date ngayKetThuc;
	
	public boolean isNgayHopLe() {
	if (ngayBatDau == null || ngayKetThuc == null) {
		return true;
	}
	return !ngayBatDau.after(ngayKetThuc);
}

}
