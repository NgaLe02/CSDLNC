package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.TripDAO;
import com.ptit.csdlnc.model.Trip;
import com.ptit.csdlnc.model.response.TripResponse;

@Service
public class TripService {
	@Autowired
	TripDAO tripDAO;

	public List<TripResponse> getLstTrip(Map<String, Object> params) throws Exception {
		List<TripResponse> result = tripDAO.getLstTrip(params);
		return result;
	}

	public int insertTrip(Trip model) throws Exception {
		int result = 0;
		try {
			result = tripDAO.insertTrip(model);
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

	public int updateTrip(Trip model) throws Exception {
		int result = 0;
		try {
			result = tripDAO.updateTrip(model);
		} catch (UncategorizedSQLException e) {
			// lỗi vi phạm trigger, foreign key, check constraint
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);

			} else {
				throw new RuntimeException("Lỗi dữ liệu không xác định!");
			}

		} catch (Exception e) {
			throw new RuntimeException("Lỗi hệ thống: " + e.getMessage());
		}
		return result;
	}

	public int deleteTrip(String id) throws Exception {
		return tripDAO.deleteTrip(id);
	}
}
