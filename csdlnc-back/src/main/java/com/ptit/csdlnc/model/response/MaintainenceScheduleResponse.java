package com.ptit.csdlnc.model.response;

import java.sql.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
public class MaintainenceScheduleResponse {
	private Integer maLichBaoDuong;
	private String maXe;
	private Double chiPhi;
	private Date ngayBaoDuong;

	private CarResponse xe;

}
