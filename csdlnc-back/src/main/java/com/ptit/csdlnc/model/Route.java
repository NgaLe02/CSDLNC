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
public class Route {
	private String maTuyen;

//	@NotNull(message = "Điểm khởi hành không được null")
//	@NotBlank(message = "Điểm khởi hành không được để trống")
//	@Size(max = 100, message = "Điểm khởi hành không quá 100 ký tự")
	private String diemKhoiHanh;

//	@NotNull(message = "Điểm đến không được null")
//	@NotBlank(message = "Điểm đến không được để trống")
//	@Size(max = 100, message = "Điểm đến không quá 100 ký tự")
	private String diemDen;

//	@NotNull(message = "Khoảng cách không được null")
//	@Positive(message = "Khoảng cách phải lớn hơn 0")
	private Double khoangCach;

//	@NotNull(message = "Thời gian ước tính không được null")
//	@Positive(message = "Thời gian ước tính phải lớn hơn 0")
	private Integer thoiGianUocTinh;

//	@NotNull(message = "Độ phức tạp không được null")
//	@Positive(message = "Độ phức tạp phải lớn hơn 0")
//	@Min(value = 1, message = "Độ phức tạp tối thiểu là 1")
//	@Max(value = 3, message = "Độ phức tạp tối đa là 3")
	private Integer doPhucTap;
	
//	@NotNull(message = "Hệ số đường khó không được null")
//	@Positive(message = "Hệ số đường khó phải lớn hơn 0")
	private Double heSoDuongKho;
	private Integer maLuongTuyen;


}
