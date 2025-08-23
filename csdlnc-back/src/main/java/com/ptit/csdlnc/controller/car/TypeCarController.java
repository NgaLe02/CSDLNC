package com.ptit.csdlnc.controller.car;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.ptit.csdlnc.model.TypeCar;
import com.ptit.csdlnc.model.response.TypeCarResponse;
import com.ptit.csdlnc.service.typeCar.TypeCarService;
import com.ptit.csdlnc.util.AjaxResult;

@RestController
@RequestMapping("api/typeCar")
@CrossOrigin(origins = "*")
public class TypeCarController {
	@Autowired
	private TypeCarService typeCarService;

	@GetMapping("getLstTypeCar")
	public ResponseEntity<AjaxResult> getLstTypeCar(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<TypeCarResponse> result = typeCarService.getLstTypeCar(params);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping("saveTypeCar")
	public ResponseEntity<AjaxResult> saveTypeCar(@RequestBody TypeCar model) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = typeCarService.insertTypeCar(model);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PutMapping("updateTypeCar")
	public ResponseEntity<AjaxResult> updateTypeCar(@RequestBody TypeCar model) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = typeCarService.updateTypeCar(model);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@DeleteMapping("{id}/deleteTypeCar")
	public ResponseEntity<AjaxResult> deleteTypeCar(@PathVariable("id") int id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = typeCarService.deleteTypeCar(id);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

}
