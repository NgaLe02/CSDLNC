package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Trip;
import com.ptit.csdlnc.model.response.AssigmentResponse;
import com.ptit.csdlnc.model.response.TripResponse;

@Mapper
public interface TripDAO {
	List<TripResponse> getLstTrip(Map<String, Object> params) throws Exception;

	int insertTrip(Trip model) throws Exception;

	int updateTrip(Trip model) throws Exception;

	int deleteTrip(Map<String, Object> payload) throws Exception;

	int countLstTrip(Map<String, Object> params) throws Exception;

}
