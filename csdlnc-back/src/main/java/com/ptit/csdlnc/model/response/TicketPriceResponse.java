package com.ptit.csdlnc.model.response;

import java.util.Date;

import javax.validation.constraints.NotNull;

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
public class TicketPriceResponse {
	private Integer maGiaVe;
	private Double giaVe;
	private String maTuyen;
	private String maMua;
	private Date ngayBatDau;

	private Date ngayKetThuc;
	private RouteResponse tuyenDuong;
	private SeasonResponse mua;

}
