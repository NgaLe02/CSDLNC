package com.ptit.csdlnc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.TicketDAO;
import com.ptit.csdlnc.model.Ticket;
import com.ptit.csdlnc.model.response.TicketResponse;

@Service
public class TicketService {
	@Autowired
	TicketDAO ticketDAO;

	public Map<String, Object> getLstTicket(Map<String, Object> params) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		if (params.get("limit") != null && params.get("page") != null) {
			int limit = Integer.parseInt(params.get("limit").toString());
			int page = Integer.parseInt(params.get("page").toString());
			int offset = (page - 1) * limit;
			params.put("offset", offset);
			params.put("limit", limit);
		}

		List<TicketResponse> result = ticketDAO.getLstTicket(params);
		resultMap.put("data", result);
		resultMap.put("count", ticketDAO.countLstTicket(params));

		return resultMap;
	}

	public int insertTicket(Ticket model) throws Exception {
		int result = 0;
		try {
			result = ticketDAO.insertTicket(model);

		} catch (DuplicateKeyException e) {
			// lỗi trùng khóa duy nhất (ví dụ UNIQUE gheNgoi + maChuyen)
			throw new RuntimeException("Ghế này đã có người mua trong chuyến xe!");

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

	public int updateTicket(Ticket model) throws Exception {
		int result = 0;
		try {
			result = ticketDAO.updateTicket(model);

		} catch (DuplicateKeyException e) {
			// lỗi trùng khóa duy nhất (ví dụ UNIQUE gheNgoi + maChuyen)
			throw new RuntimeException("Ghế này đã có người mua trong chuyến xe!");

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

	public int deleteTicket(int id) throws Exception {
		return ticketDAO.deleteTicket(id);
	}
}
