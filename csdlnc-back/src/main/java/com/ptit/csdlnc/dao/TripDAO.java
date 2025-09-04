package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Trip;
import com.ptit.csdlnc.model.response.TripResponse;

@Mapper
public interface TripDAO {
	List<TripResponse> getLstTrip(Map<String, Object> params) throws Exception;

	int insertTrip(Trip model) throws Exception;

	int updateTrip(Trip model) throws Exception;

	int deleteTrip(String id) throws Exception;

	int countLstTrip(Map<String, Object> params) throws Exception;

}
