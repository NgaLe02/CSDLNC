package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.CarDAO;
import com.ptit.csdlnc.model.Car;
import com.ptit.csdlnc.model.TypeCar;
import com.ptit.csdlnc.model.response.CarResponse;

@Service
public class CarService {
	@Autowired
	CarDAO carDAO;
	public List<CarResponse> getLstCar(Map<String, Object> params) throws Exception {
		List<CarResponse> result = carDAO.getLstCar(params);
		return result;
	}
	

	public int insertCar(Car model) throws Exception {
		if(carDAO.checkBienSoExist(model.getBienSo())) {
			
		}
		int result = carDAO.insertCar(model);
		return result;
	}

	public int updateCar(Car model) throws Exception {
		int result = carDAO.updateCar(model);
		return result;
	}

	public int deleteCar(int id) throws Exception {
		return carDAO.deleteCar(id);
	}
}
