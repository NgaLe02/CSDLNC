package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.RouteSalary;
import com.ptit.csdlnc.model.response.RouteSalaryResponse;

@Mapper
public interface RouteSalaryDAO {
	List<RouteSalaryResponse> getLstRouteSalary(Map<String, Object> params) throws Exception;

	int insertRouteSalary(RouteSalary model) throws Exception;

	int updateRouteSalary(RouteSalary model) throws Exception;

	int deleteRouteSalary(int id) throws Exception;

}
