package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.MaintainenceSchedule;
import com.ptit.csdlnc.model.response.MaintainenceScheduleResponse;

@Mapper
public interface MaintainenceScheduleDAO {
	List<MaintainenceScheduleResponse> getLstMaintainenceSchedule(Map<String, Object> params) throws Exception;

	int insertMaintainenceSchedule(MaintainenceSchedule model) throws Exception;

	int updateMaintainenceSchedule(MaintainenceSchedule model) throws Exception;

	int deleteMaintainenceSchedule(int id) throws Exception;

}
