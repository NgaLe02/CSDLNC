package com.ptit.csdlnc.dao.car;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.response.CarResponse;

@Mapper
public interface CarDAO {
	List<CarResponse> getLstCar(Map<String, Object> params) throws Exception;

}
