package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Ticket;
import com.ptit.csdlnc.model.response.TicketResponse;

@Mapper
public interface TicketDAO {
	List<TicketResponse> getLstTicket(Map<String, Object> params) throws Exception;

	int insertTicket(Ticket model) throws Exception;

	int updateTicket(Ticket model) throws Exception;

	int deleteTicket(Map<String, Object> payload) throws Exception;

	int countLstTicket(Map<String, Object> params);

}
