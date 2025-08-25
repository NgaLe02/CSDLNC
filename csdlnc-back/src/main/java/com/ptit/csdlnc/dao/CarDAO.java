package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Car;
import com.ptit.csdlnc.model.TypeCar;
import com.ptit.csdlnc.model.response.CarResponse;

@Mapper
public interface CarDAO {
	List<CarResponse> getLstCar(Map<String, Object> params) throws Exception;

	int insertCar(Car model) throws Exception;

	int updateCar(Car model) throws Exception;

	int deleteCar(int id) throws Exception;

	boolean checkBienSoExist(String bienSo) throws Exception;
}
