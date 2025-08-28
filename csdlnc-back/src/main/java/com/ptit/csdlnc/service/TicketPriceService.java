package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.TicketPriceDAO;
import com.ptit.csdlnc.model.TicketPrice;
import com.ptit.csdlnc.model.response.SeasonResponse;
import com.ptit.csdlnc.model.response.TicketPriceResponse;

@Service
public class TicketPriceService {
	@Autowired
	TicketPriceDAO ticketPriceDAO;

	public List<TicketPriceResponse> getLstTicketPrice(Map<String, Object> params) throws Exception {
		List<TicketPriceResponse> result = ticketPriceDAO.getLstTicketPrice(params);
		return result;
	}

	public int insertTicketPrice(TicketPrice model) throws Exception {
		int result = 0;
		try {
			result = ticketPriceDAO.insertTicketPrice(model);
		} catch (DuplicateKeyException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

		}
		return result;
	}

	public int updateTicketPrice(TicketPrice model) throws Exception {
		int result = 0;
		try {
			result = ticketPriceDAO.updateTicketPrice(model);
		} catch (DuplicateKeyException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();
		}
		return result;
	}

	public int deleteTicketPrice(int id) throws Exception {
		return ticketPriceDAO.deleteTicketPrice(id);
	}
}
