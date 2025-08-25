package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.response.PassengerResponse;

@Mapper
public interface PassengerDAO {
	List<PassengerResponse> Passenger(Map<String, Object> params)throws Exception;

	int insertPassengerr(PassengerDAO model)throws Exception;

	int updateTypeCar(PassengerDAO model)throws Exception;

	int deletePassenger(int id)throws Exception;

}
