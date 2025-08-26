package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.RouthSalary;
import com.ptit.csdlnc.model.response.RouthSalaryResponse;

@Mapper
public interface RouthSalaryDAO {
	List<RouthSalaryResponse> getLstRouthSalary(Map<String, Object> params) throws Exception;

	int insertRouthSalary(RouthSalary model) throws Exception;

	int updateRouthSalary(RouthSalary model) throws Exception;

	int deleteRouthSalary(int id) throws Exception;

}
