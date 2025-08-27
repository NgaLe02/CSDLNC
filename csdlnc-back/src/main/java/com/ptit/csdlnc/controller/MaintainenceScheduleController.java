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

import com.ptit.csdlnc.model.MaintainenceSchedule;
import com.ptit.csdlnc.model.response.MaintainenceScheduleResponse;
import com.ptit.csdlnc.service.MaintainenceScheduleService;
import com.ptit.csdlnc.util.AjaxResult;

@RestController
@RequestMapping("api/maintainenceSchedule")
@CrossOrigin(origins = "*")
public class MaintainenceScheduleController {
	@Autowired
	private MaintainenceScheduleService maintainenceScheduleService;

	@GetMapping("getLstMaintainenceSchedule")
	public ResponseEntity<AjaxResult> getLstMaintainenceSchedule(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<MaintainenceScheduleResponse> result = maintainenceScheduleService.getLstMaintainceSchedule(params);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Tìm kiếm không thành công!");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping("insertMaintainenceSchedule")
	public ResponseEntity<AjaxResult> insertMaintainenceSchedule(@Validated @RequestBody MaintainenceSchedule model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}
		try {
			int result = maintainenceScheduleService.insertMaintainenceSchedule(model);
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

	@PutMapping("updateMaintainenceSchedule")
	public ResponseEntity<AjaxResult> updateMaintainenceSchedule(@Validated @RequestBody MaintainenceSchedule model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}

		try {
			int result = maintainenceScheduleService.updateMaintainenceSchedule(model);
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

	@DeleteMapping("{id}/deleteMaintainenceSchedule")
	public ResponseEntity<AjaxResult> deleteMaintainenceSchedule(@PathVariable("id") int id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = maintainenceScheduleService.deleteMaintainenceSchedule(id);
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
