package com.ptit.csdlnc.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RouthSalary {
	private Integer maLuongTuyen;

	@NotNull(message = "Độ phức tạp không được null")
	@Positive(message = "Độ phức tạp phải lớn hơn 0")
	@Max(value = 3, message = "Độ phức tạp tối đa là 3")
	private Integer doPhucTap;

	@NotNull(message = "Khoảng cách từ không được null")
	@Positive(message = "Khoảng cách từ phải lớn hơn 0")
	private Double khoangCachTu;

	@NotNull(message = "Khoảng cách đến không được null")
	@Positive(message = "Khoảng cách đến phải lớn hơn 0")
	private Double khoangCachDen;

	@NotNull(message = "Lương cơ bản không được null")
	@PositiveOrZero(message = "Lương cơ bản phải lớn hơn hoặc bằng 0")
	private Double luongCoBan;

	@AssertTrue(message = "Khoảng cách từ phải nhỏ hơn hoặc bằng khoảng cách đến")
	private boolean isKhoangCachHopLe() {
		if (khoangCachTu == null || khoangCachDen == null)
			return true;
		return khoangCachTu <= khoangCachDen;
	}
}
