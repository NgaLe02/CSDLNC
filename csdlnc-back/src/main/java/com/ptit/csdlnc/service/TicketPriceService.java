package com.ptit.csdlnc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.TicketPriceDAO;
import com.ptit.csdlnc.model.TicketPrice;
import com.ptit.csdlnc.model.response.SeasonResponse;
import com.ptit.csdlnc.model.response.TicketPriceResponse;

@Service
public class TicketPriceService {
	@Autowired
	TicketPriceDAO ticketPriceDAO;

	public Map<String, Object> getLstTicketPrice(Map<String, Object> params) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		
		if (params.get("limit") != null && params.get("page") != null) {
			int limit = Integer.parseInt(params.get("limit").toString());
			int page = Integer.parseInt(params.get("page").toString());
			int offset = (page - 1) * limit;
			params.put("offset", offset);
			params.put("limit", limit);
		}
		
		List<TicketPriceResponse> result = ticketPriceDAO.getLstTicketPrice(params);
		resultMap.put("data", result);
		resultMap.put("count", ticketPriceDAO.countLstTicketPrice(params));
		return resultMap;
	}

	public int insertTicketPrice(TicketPrice model) throws Exception {
		int result = 0;
		try {
			result = ticketPriceDAO.insertTicketPrice(model);
		} catch (UncategorizedSQLException e) {
			// lỗi vi phạm trigger, foreign key, check constraint
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);
			} else {
				throw new RuntimeException("Lỗi dữ liệu không xác định!");
			}

		}
		return result;
	}

	public int updateTicketPrice(TicketPrice model) throws Exception {
		int result = 0;
		try {
			result = ticketPriceDAO.updateTicketPrice(model);
		} catch (UncategorizedSQLException e) {
			// lỗi vi phạm trigger, foreign key, check constraint
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);
			} else {
				throw new RuntimeException("Lỗi dữ liệu không xác định!");
			}

		}
		return result;
	}

	public int deleteTicketPrice(Map<String, Object> params) throws Exception {
		return ticketPriceDAO.deleteTicketPrice(params);
	}

	public TicketPriceResponse findByTuyenAndMua(Map<String, Object> params) throws Exception {
		TicketPriceResponse result = ticketPriceDAO.findByTuyenAndMua(params);
		if(result == null) {
			throw new RuntimeException("Không tìm thấy giá vé phù hợp!");
		}
		return result;
	}

	public Map<String, Object> getSellSeat(Map<String, Object> params) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("bookedSeat", ticketPriceDAO.getBookedSeat(params));
		resultMap.put("allSeat", ticketPriceDAO.getAllSeat(params));
		return resultMap;
	}
}
