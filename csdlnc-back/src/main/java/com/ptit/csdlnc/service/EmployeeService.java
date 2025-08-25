package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.EmployeeDAO;
import com.ptit.csdlnc.model.Employee;
import com.ptit.csdlnc.model.response.EmployeeResponse;
import com.ptit.csdlnc.model.response.PassengerResponse;

@Service
public class EmployeeService {
	@Autowired
	EmployeeDAO employeeDAO;

	public List<EmployeeResponse> getLstEmployee(Map<String, Object> params) throws Exception {
		List<EmployeeResponse> result = employeeDAO.getLstEmployee(params);
		return result;
	}

	public int insertEmployee(Employee model) throws Exception {
		int result = 0;
		try {
			result = employeeDAO.insertEmployee(model);
		} catch (DuplicateKeyException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				if (msg.contains("cmnd")) {
					throw new RuntimeException("CMND đã tồn tại!");
				} else {
					throw new RuntimeException("Dữ liệu đã tồn tại!");
				}
			} else {
				throw new RuntimeException("Dữ liệu đã tồn tại!");
			}
		}
		return result;
	}

	public int updateEmployee(Employee model) throws Exception {
		int result = 0;
		try {
			result = employeeDAO.updateEmployee(model);
		} catch (DuplicateKeyException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				if (msg.contains("cmnd")) {
					throw new RuntimeException("CMND đã tồn tại!");
				} else {
					throw new RuntimeException("Dữ liệu đã tồn tại!");
				}
			} else {
				throw new RuntimeException("Dữ liệu đã tồn tại!");
			}
		}
		return result;
	}

	public int deleteEmployee(int id) throws Exception {
		return employeeDAO.deleteEmployee(id);
	}
}
