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

import com.ptit.csdlnc.model.RouteSalary;
import com.ptit.csdlnc.model.response.RouteSalaryResponse;
import com.ptit.csdlnc.model.response.TicketPriceResponse;
import com.ptit.csdlnc.service.RouteSalaryService;
import com.ptit.csdlnc.util.AjaxResult;

@RestController
@RequestMapping("api/routeSalary")
@CrossOrigin(origins = "*")
public class RouteSalaryController {
	@Autowired
	private RouteSalaryService routeSalaryService;

	@GetMapping("getLstRouteSalary")
	public ResponseEntity<AjaxResult> getLstRouteSalary(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<RouteSalaryResponse> result = routeSalaryService.getLstRouteSalary(params);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Tìm kiếm không thành công!");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping("insertRouteSalary")
	public ResponseEntity<AjaxResult> insertRouteSalary(@Validated @RequestBody RouteSalary model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}

		try {
			int result = routeSalaryService.insertRouteSalary(model);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
			ajaxResult.setMessage("Lưu thành công");
			return ResponseEntity.ok(ajaxResult);
		} catch (RuntimeException e) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(e.getMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Lưu thất bại");
			return ResponseEntity.badRequest().body(ajaxResult);
		}
	}

	@PutMapping("updateRouteSalary")
	public ResponseEntity<AjaxResult> updateRouteSalary(@Validated @RequestBody RouteSalary model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}

		try {
			int result = routeSalaryService.updateRouteSalary(model);
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

	@DeleteMapping("{id}/deleteRouteSalary")
	public ResponseEntity<AjaxResult> deleteRouteSalary(@PathVariable("id") int id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = routeSalaryService.deleteRouteSalary(id);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
			ajaxResult.setMessage("Xoá thành công");
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

	@GetMapping("findRouteSalayByDoPhucTapAndKc")
	public ResponseEntity<AjaxResult> findRouteSalayByDoPhucTapAndKc(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			RouteSalaryResponse result = routeSalaryService.findRouteSalayByDoPhucTapAndKc(params);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
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
}
