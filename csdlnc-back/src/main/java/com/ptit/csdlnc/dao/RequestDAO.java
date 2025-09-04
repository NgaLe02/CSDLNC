package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Employee;
import com.ptit.csdlnc.model.Passenger;
import com.ptit.csdlnc.model.response.EmployeeResponse;
import com.ptit.csdlnc.model.response.PassengerResponse;

@Mapper
public interface RequestDAO {
	List<Map<String, Object>> getSalary(Map<String, Object> param) throws Exception;

}
