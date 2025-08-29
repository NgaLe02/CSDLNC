package com.ptit.csdlnc.model.response;

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
public class AssigmentResponse {
	private Integer maNhanVien;
	private String maChuyen;
	private String maTuyen;
	private String maXe;
	private String vaiTro;
	
	private EmployeeResponse nhanVien;
	private TripResponse chuyenXe;
	private RouteResponse tuyenDuong;
	private CarResponse xe;
	

}
