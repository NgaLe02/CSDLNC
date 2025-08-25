package com.ptit.csdlnc.controller.car;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.csdlnc.model.Car;
import com.ptit.csdlnc.model.TypeCar;
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
			ajaxResult.setMessage("Tìm kiếm không thành công!");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping("saveCar")
	public ResponseEntity<AjaxResult> saveCar(@Validated @RequestBody Car model, BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}

		try {
			int result = carService.insertCar(model);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
			ajaxResult.setMessage("Lưu thành công");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Lưu thất bại");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PutMapping("updateCar")
	public ResponseEntity<AjaxResult> updateCar(@Validated @RequestBody Car model, BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}

		try {
			int result = carService.updateCar(model);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
			ajaxResult.setMessage("Cập nhật thành công");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Cập nhật thất bại");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@DeleteMapping("{id}/deleteCar")
	public ResponseEntity<AjaxResult> deleteCar(@PathVariable("id") int id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = carService.deleteCar(id);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
			ajaxResult.setMessage("Xoá thành công");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Xoá thất bại");
		}
		return ResponseEntity.ok(ajaxResult);
	}

}
