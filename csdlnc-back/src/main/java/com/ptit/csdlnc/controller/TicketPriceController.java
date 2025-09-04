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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.csdlnc.model.TicketPrice;
import com.ptit.csdlnc.model.response.TicketPriceResponse;
import com.ptit.csdlnc.service.TicketPriceService;
import com.ptit.csdlnc.util.AjaxResult;

@RestController
@RequestMapping("api/ticketPrice")
@CrossOrigin(origins = "*")
public class TicketPriceController {
	@Autowired
	private TicketPriceService ticketPriceService;

	@GetMapping("getLstTicketPrice")
	public ResponseEntity<AjaxResult> getLstTicketPrice(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<TicketPriceResponse> result = ticketPriceService.getLstTicketPrice(params);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Tìm kiếm không thành công!");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping("insertTicketPrice")
	public ResponseEntity<AjaxResult> insertTicketPrice(@Validated @RequestBody TicketPrice model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}
		try {
			int result = ticketPriceService.insertTicketPrice(model);
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

	@PutMapping("updateTicketPrice")
	public ResponseEntity<AjaxResult> updateTicketPrice(@Validated @RequestBody TicketPrice model,
			BindingResult bindingResult) {
		AjaxResult ajaxResult = new AjaxResult();

		if (bindingResult.hasErrors()) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(bindingResult.getAllErrors().get(0).getDefaultMessage());
			return ResponseEntity.badRequest().body(ajaxResult);
		}

		try {
			int result = ticketPriceService.updateTicketPrice(model);
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

	@DeleteMapping("deleteTicketPrice")
	public ResponseEntity<AjaxResult> deleteTicketPrice(@RequestBody Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = ticketPriceService.deleteTicketPrice(params);
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
	
	@GetMapping("findByTuyenAndMua")
	public ResponseEntity<AjaxResult> findByTuyenAndMua(@RequestParam Map<String, Object> params) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			TicketPriceResponse result = ticketPriceService.findByTuyenAndMua(params);
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
