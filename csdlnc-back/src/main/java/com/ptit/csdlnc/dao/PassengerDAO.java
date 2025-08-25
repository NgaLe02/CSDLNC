package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Passenger;
import com.ptit.csdlnc.model.response.PassengerResponse;

@Mapper
public interface PassengerDAO {
	List<PassengerResponse> getLstPassenger(Map<String, Object> params)throws Exception;

	int insertPassenger(Passenger model)throws Exception;

	int updatePassenger(Passenger model)throws Exception;

	int deletePassenger(int id)throws Exception;

}
