package com.ptit.csdlnc.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.csdlnc.service.RequestService;
import com.ptit.csdlnc.util.AjaxResult;

@RestController
@RequestMapping("api/request")
@CrossOrigin(origins = "*")
public class RequestController {
	@Autowired
	private RequestService requestService;

	@GetMapping("employee/getSalary")
	public ResponseEntity<AjaxResult> getSalary(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<String, Object> result = requestService.getSalary(params);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Tìm kiếm không thành công!");
		}
		return ResponseEntity.ok(ajaxResult);
	}
}
