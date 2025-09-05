package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Assignment;
import com.ptit.csdlnc.model.Trip;
import com.ptit.csdlnc.model.response.AssigmentResponse;

@Mapper
public interface AssigmentDAO {
	List<AssigmentResponse> getLstAssigment(Map<String, Object> params) throws Exception;

	int insertAssignment(Assignment model) throws Exception;

	int updateAssignment(Assignment model) throws Exception;

	int deleteAssignment(String id) throws Exception;

	int deleteAssignmentToTrip(Map<String, Object> params) throws Exception;

	List<AssigmentResponse> getAssignEmployeesToTrip(Map<String, Object> model) throws Exception;
}
