package com.ptit.csdlnc.service.car;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.car.CarDAO;
import com.ptit.csdlnc.model.response.CarResponse;

@Service
public class CarService {
	@Autowired
	CarDAO carDAO;
	public List<CarResponse> getLstCar(Map<String, Object> params) throws Exception {
		List<CarResponse> result = carDAO.getLstCar(params);
		return result;
	}
}
