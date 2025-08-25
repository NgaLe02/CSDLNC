package com.ptit.csdlnc.controller;

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

import com.ptit.csdlnc.model.Passenger;
import com.ptit.csdlnc.model.TypeCar;
import com.ptit.csdlnc.model.response.PassengerResponse;
import com.ptit.csdlnc.model.response.TypeCarResponse;
import com.ptit.csdlnc.service.PassengerService;
import com.ptit.csdlnc.service.TypeCarService;
import com.ptit.csdlnc.util.AjaxResult;

@RestController
@RequestMapping("api/passeneger")
@CrossOrigin(origins = "*")
public class PassengerController {
	@Autowired
	private PassengerService passengerService;

	@GetMapping("getLstPassenger")
	public ResponseEntity<AjaxResult> getLstPassenger(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<PassengerResponse> result = passengerService.getLstPassenger(params);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Tìm kiếm không thành công!");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping("insertPassenger")
	public ResponseEntity<AjaxResult> insertPassenger(@Validated @RequestBody Passenger model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}
		try {
			int result = passengerService.insertPassenger(model);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
			ajaxResult.setMessage("Lưu thành công");
		} catch (RuntimeException e) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Lưu thất bại");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PutMapping("updatePassenger")
	public ResponseEntity<AjaxResult> updatePassenger(@Validated @RequestBody Passenger model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}

		try {
			int result = passengerService.updatePassenger(model);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
			ajaxResult.setMessage("Cập nhật thành công");
		} catch (RuntimeException e) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Cập nhật thất bại");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@DeleteMapping("{id}/deletePassenger")
	public ResponseEntity<AjaxResult> deletePassenger(@PathVariable("id") int id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = passengerService.deletePassenger(id);
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
