package com.ptit.csdlnc.model.response;

import java.util.Date;

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
public class TicketResponse {
	private String maVe;
	private String maXe;
	private String maTuyen;
	private String maChuyen;
	private String gheNgoi;
	private Integer maHanhKhach;
	private Date ngayMua;
	private String maVeFull;

	private PassengerResponse hanhKhach;
	private TripResponse chuyenXe;
	private CarResponse xe;
	private RouteResponse tuyenDuong;

}
