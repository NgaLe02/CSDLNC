package com.ptit.csdlnc.model.response;

import java.sql.Date;

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
	private Date ngayHieuLuc;
	private Date ngayKetThuc;
	private String maTuyen;
	private Integer maMua;

	private SeasonResponse mua;

}
