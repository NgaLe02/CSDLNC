package com.ptit.csdlnc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.EmployeeDAO;
import com.ptit.csdlnc.model.Employee;
import com.ptit.csdlnc.model.response.EmployeeResponse;
import com.ptit.csdlnc.model.response.PassengerResponse;

@Service
public class EmployeeService {
	@Autowired
	EmployeeDAO employeeDAO;

	public Map<String, Object> getLstEmployee(Map<String, Object> params) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		if (params.get("limit") != null && params.get("page") != null) {
			int limit = Integer.parseInt(params.get("limit").toString());
			int page = Integer.parseInt(params.get("page").toString());
			int offset = (page - 1) * limit;
			params.put("offset", offset);
			params.put("limit", limit);
		}

		List<EmployeeResponse> result = employeeDAO.getLstEmployee(params);
		resultMap.put("data", result);
		resultMap.put("count", employeeDAO.countLstEmployee(params));
		return resultMap;
	}

	public int insertEmployee(Employee model) throws Exception {
		int result = 0;
		try {
			result = employeeDAO.insertEmployee(model);
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

	public int updateEmployee(Employee model) throws Exception {
		int result = 0;
		try {
			result = employeeDAO.updateEmployee(model);
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

	public int deleteEmployee(int id) throws Exception {
		return employeeDAO.deleteEmployee(id);
	}
}
