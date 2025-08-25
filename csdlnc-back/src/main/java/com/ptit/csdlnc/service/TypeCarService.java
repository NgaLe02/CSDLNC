package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.TypeCarDAO;
import com.ptit.csdlnc.model.TypeCar;
import com.ptit.csdlnc.model.response.TypeCarResponse;

@Service
public class TypeCarService {
	@Autowired
	TypeCarDAO typeCarDAO;

	public List<TypeCarResponse> getLstTypeCar(Map<String, Object> params) throws Exception {
		List<TypeCarResponse> result = typeCarDAO.getLstTypeCar(params);
		return result;
	}

	public int insertTypeCar(TypeCar model) throws Exception {
		int result = typeCarDAO.insertTypeCar(model);
		return result;
	}

	public int updateTypeCar(TypeCar model) throws Exception {
		int result = typeCarDAO.updateTypeCar(model);
		return result;
	}

	public int deleteTypeCar(int id) throws Exception {
		return typeCarDAO.deleteTypeCar(id);
	}
}
