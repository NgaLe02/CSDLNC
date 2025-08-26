package com.ptit.csdlnc.model;

import java.sql.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
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
public class TicketPrice {
	private Integer maGiaVe;

	@NotNull(message = "Giá vé không được null")
	@Positive(message = "Giá vé phải lớn hơn 0")
	private Double giaVe;

	@NotNull(message = "Ngày hiệu lực không được null")
	private Date ngayHieuLuc;

	private Date ngayKetThuc;

	@NotNull(message = "Mã tuyến không được null")
	@Size(max = 4, message = "Mã tuyến tối đa 4 ký tự")
	private String maTuyen;

	@NotNull(message = "Mã mùa không được null")
	private Integer maMua;

	public boolean isNgayHopLe() {
		if (ngayHieuLuc == null || ngayKetThuc == null) {
			return true;
		}
		return !ngayHieuLuc.after(ngayKetThuc);
	}
}
