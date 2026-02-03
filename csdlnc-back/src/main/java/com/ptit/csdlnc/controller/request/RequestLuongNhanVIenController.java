package com.ptit.csdlnc.controller.request;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.csdlnc.service.request.RequestLuongNhanVienService;

@RestController
@RequestMapping("api/request/luong-nhan-vien")
public class RequestLuongNhanVIenController {

    @Autowired
    private RequestLuongNhanVienService requestService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getLuongNhanVien(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer thang,
            @RequestParam(required = false) Integer nam,
            @RequestParam(required = false) String sortField,
            @RequestParam(required = false) String sortOrder
    ) {
        return ResponseEntity.ok(
                requestService.getLuongNhanVien(keyword, thang, nam, sortField, sortOrder)
        );
    }

}
