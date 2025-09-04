package com.ptit.csdlnc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.EmployeeDAO;
import com.ptit.csdlnc.dao.RequestDAO;
import com.ptit.csdlnc.model.Employee;
import com.ptit.csdlnc.model.response.EmployeeResponse;
import com.ptit.csdlnc.model.response.PassengerResponse;

@Service
public class RequestService {
	@Autowired
	RequestDAO requestDAO;


	public Map<String, Object> getSalary(Map<String, Object> params) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("data", requestDAO.getSalary(params));

		return resultMap;
	}
}
