package com.ptit.csdlnc.model;

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
public class Ticket {
	private String maVe;
	private String gheNgoi;
	private Integer maHanhKhach;
	private String maChuyen;
	private Date ngayMua;

}
