package com.ptit.csdlnc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.PassengerDAO;
import com.ptit.csdlnc.model.Car;
import com.ptit.csdlnc.model.Passenger;
import com.ptit.csdlnc.model.response.CarResponse;
import com.ptit.csdlnc.model.response.PassengerResponse;

@Service
public class PassengerService {
	@Autowired
	PassengerDAO passengerDAO;

	public Map<String, Object> getLstPassenger(Map<String, Object> params) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		if (params.get("limit") != null && params.get("page") != null) {
			int limit = Integer.parseInt(params.get("limit").toString());
			int page = Integer.parseInt(params.get("page").toString());
			int offset = (page - 1) * limit;
			params.put("offset", offset);
			params.put("limit", limit);
		}

		List<PassengerResponse> result = passengerDAO.getLstPassenger(params);
		resultMap.put("data", result);
		resultMap.put("count", passengerDAO.countLstPassenger(params));
		return resultMap;
	}

	public int insertPassenger(Passenger model) throws Exception {
		int result = 0;
		try {
			result = passengerDAO.insertPassenger(model);
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

	public int updatePassenger(Passenger model) throws Exception {
		int result = 0;
		try {
			result = passengerDAO.updatePassenger(model);
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

	public int deletePassenger(int id) throws Exception {
		return passengerDAO.deletePassenger(id);
	}
}
