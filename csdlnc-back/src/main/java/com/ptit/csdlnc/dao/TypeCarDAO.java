package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.TypeCar;
import com.ptit.csdlnc.model.response.TypeCarResponse;

@Mapper
public interface TypeCarDAO {
	List<TypeCarResponse> getLstTypeCar(Map<String, Object> params)throws Exception;

	int insertTypeCar(TypeCar model)throws Exception;

	int updateTypeCar(TypeCar model)throws Exception;

	int deleteTypeCar(int id)throws Exception;

}
