package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.TicketDAO;
import com.ptit.csdlnc.model.Ticket;
import com.ptit.csdlnc.model.response.TicketResponse;

@Service
public class TicketService {
	@Autowired
	TicketDAO ticketDAO;

	public List<TicketResponse> getLstTicket(Map<String, Object> params) throws Exception {
		List<TicketResponse> result = ticketDAO.getLstTicket(params);
		return result;
	}

	public int insertTicket(Ticket model) throws Exception {
		int result = 0;
		try {
			result = ticketDAO.insertTicket(model);

		} catch (DuplicateKeyException e) {
			// lỗi trùng khóa duy nhất (ví dụ UNIQUE gheNgoi + maChuyen)
			throw new RuntimeException("Ghế này đã có người mua trong chuyến xe!");

		} catch (DataIntegrityViolationException e) {
			// lỗi vi phạm trigger, foreign key, check constraint
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				if (msg.contains("Ngày mua vé không được NULL")) {
					throw new RuntimeException("Ngày mua vé không được để trống!");
				} else if (msg.contains("FK_maHanhKhach")) {
					throw new RuntimeException("Hành khách không tồn tại!");
				} else if (msg.contains("FK_maChuyen")) {
					throw new RuntimeException("Chuyến xe không tồn tại!");
				} else {
					throw new RuntimeException("Lỗi dữ liệu: " + msg);
				}
			} else {
				throw new RuntimeException("Lỗi dữ liệu không xác định!");
			}

		} catch (Exception e) {
			throw new RuntimeException("Lỗi hệ thống: " + e.getMessage());
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

		} catch (DataIntegrityViolationException e) {
			// lỗi vi phạm trigger, foreign key, check constraint
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				if (msg.contains("Ngày mua vé không được NULL")) {
					throw new RuntimeException("Ngày mua vé không được để trống!");
				} else if (msg.contains("FK_maHanhKhach")) {
					throw new RuntimeException("Hành khách không tồn tại!");
				} else if (msg.contains("FK_maChuyen")) {
					throw new RuntimeException("Chuyến xe không tồn tại!");
				} else {
					throw new RuntimeException("Lỗi dữ liệu: " + msg);
				}
			} else {
				throw new RuntimeException("Lỗi dữ liệu không xác định!");
			}

		} catch (Exception e) {
			throw new RuntimeException("Lỗi hệ thống: " + e.getMessage());
		}
		return result;
	}

	public int deleteTicket(int id) throws Exception {
		return ticketDAO.deleteTicket(id);
	}
}
