package com.ptit.csdlnc.model;

import java.sql.Date;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

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
public class RouteSalary {
	private Integer maLuongTuyen;

	@NotNull(message = "Độ phức tạp không được null")
	@Positive(message = "Độ phức tạp phải lớn hơn 0")
	@Min(value = 1, message = "Độ phức tạp tối thiểu là 1")
	@Max(value = 3, message = "Độ phức tạp tối đa là 3")
	private Integer doPhucTap;

	@NotNull(message = "Khoảng cách từ không được null")
	@PositiveOrZero(message = "Khoảng cách từ phải lớn hơn bằng 0")
	private Double khoangCachTu;

	@NotNull(message = "Khoảng cách đến không được null")
	@Positive(message = "Khoảng cách đến phải lớn hơn 0")
	private Double khoangCachDen;

	private Double luongCoBan;

	@NotNull(message = "Ngày bắt đầu không được null")
	private Date ngayBatDau;
	
	private Date ngayKetThuc;
	
	@AssertTrue(message = "Khoảng cách từ phải nhỏ hơn hoặc bằng khoảng cách đến")
	private boolean isKhoangCachHopLe() {
		if (khoangCachTu == null || khoangCachDen == null)
			return true;
		return khoangCachTu <= khoangCachDen;
	}

	public boolean isNgayHopLe() {
		if (ngayBatDau == null || ngayKetThuc == null) {
			return true;
		}
		return !ngayBatDau.after(ngayKetThuc);
	}
	
	// Lương thực tế chỉ phụ thuộc vào chiều dài & độ phức tạp
	public Double getLuongCoBan() {
		if (khoangCachTu == null || khoangCachDen == null || doPhucTap == null) {
			return null;
		}

		double chieuDai = khoangCachDen - khoangCachTu;

		double heSoPhucTap;
		switch (doPhucTap) {
		case 1:
			heSoPhucTap = 1.0;
			break; // dễ
		case 2:
			heSoPhucTap = 1.5;
			break; // trung bình
		case 3:
			heSoPhucTap = 2.0;
			break; // khó
		default:
			heSoPhucTap = 1.0;
		}

		// Ví dụ công thức: lương = chiều dài * hệ số phức tạp * 1000
		return chieuDai * heSoPhucTap * 1000;
	}
}
