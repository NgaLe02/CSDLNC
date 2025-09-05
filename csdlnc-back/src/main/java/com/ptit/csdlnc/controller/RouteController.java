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

import com.ptit.csdlnc.model.Route;
import com.ptit.csdlnc.model.response.RouteResponse;
import com.ptit.csdlnc.service.RouteService;
import com.ptit.csdlnc.util.AjaxResult;

@RestController
@RequestMapping("api/route")
@CrossOrigin(origins = "*")
public class RouteController {
	@Autowired
	private RouteService routeService;

	@GetMapping("getLstRoute")
	public ResponseEntity<AjaxResult> getLstRoute(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<String, Object> result = routeService.getLstRoute(params);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Tìm kiếm không thành công!");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping("insertRoute")
	public ResponseEntity<AjaxResult> insertRoute(@Validated @RequestBody Route model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}

		try {
			int result = routeService.insertRoute(model);
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

	@PutMapping("updateRoute")
	public ResponseEntity<AjaxResult> updateRoute(@Validated @RequestBody Route model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}

		try {
			int result = routeService.updateRoute(model);
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

	@DeleteMapping("{id}/deleteRoute")
	public ResponseEntity<AjaxResult> deleteRoute(@PathVariable("id") int id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = routeService.deleteRoute(id);
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
