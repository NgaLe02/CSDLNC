package com.ptit.csdlnc.controller.request;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.csdlnc.service.request.RequestDuAnService;

@RestController
@RequestMapping("api/request/du-an")
public class RequestDuAnController {

    @Autowired
    private RequestDuAnService requestService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getLstDuAn(
            @RequestParam(required = false) String tenDuAn,
            @RequestParam(required = false) Integer thang,
            @RequestParam(required = false) Integer nam
    ) {
        return ResponseEntity.ok(
                requestService.getLstDuAn(tenDuAn, thang, nam)
        );
    }

    @GetMapping("cong-doan")
    public ResponseEntity<Map<String, Object>> getCongDoanDuAn(
            @RequestParam(required = false) String maDuAn
    ) {
        return ResponseEntity.ok(
                requestService.getCongDoanDuAn(maDuAn)
        );
    }
}
