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
public class TripResponse {
	private String maChuyen;
	private String tinhTrangChuyen;
	private Date ngayGioKhoiHanh;
	private Date ngayGioDen;
	private Double chiPhiVanHanh;
	private Double tiLeThuLao;
	private String maXe;
	private String maTuyen;
	private String maMua;
	private String maGiaVe;

	private CarResponse xe;
	private RouteResponse tuyenDuong;

	private TicketPriceResponse giaVe;
	private SeasonResponse mua;

	private Integer soVeDaBan;
}
