package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.TicketPrice;
import com.ptit.csdlnc.model.response.TicketPriceResponse;

@Mapper
public interface TicketPriceDAO {
	List<TicketPriceResponse> getLstTicketPrice(Map<String, Object> params) throws Exception;

	int insertTicketPrice(TicketPrice model) throws Exception;

	int updateTicketPrice(TicketPrice model) throws Exception;

	int deleteTicketPrice(int id) throws Exception;

}
