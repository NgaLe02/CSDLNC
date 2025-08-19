package com.ptit.csdlnc.controller.car;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.csdlnc.model.response.CarResponse;
import com.ptit.csdlnc.service.car.CarService;
import com.ptit.csdlnc.util.AjaxResult;

@RestController
@RequestMapping("api/car")
@CrossOrigin(origins = "*")
public class CarController {
	@Autowired
	private CarService carService;

	@GetMapping("getLstCar")
	public ResponseEntity<AjaxResult> getLstCar(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<CarResponse> result = carService.getLstCar(params);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
}
