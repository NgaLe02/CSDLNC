package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Assignment;
import com.ptit.csdlnc.model.response.AssigmentResponse;

@Mapper
public interface AssigmentDAO {
	List<AssigmentResponse> getLstAssigment(Map<String, Object> params) throws Exception;

	int insertAssigment(Assignment model) throws Exception;

	int updateAssigment(Assignment model) throws Exception;

	int deleteAssigment(String id) throws Exception;
}
