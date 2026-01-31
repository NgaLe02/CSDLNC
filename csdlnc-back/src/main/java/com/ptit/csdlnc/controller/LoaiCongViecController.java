package com.ptit.csdlnc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.csdlnc.model.LoaiCongViec;
import com.ptit.csdlnc.service.LoaiCongViecService;

@RestController
@RequestMapping("api/loai-cong-viec")
public class LoaiCongViecController {

    @Autowired
    private LoaiCongViecService service;

    @GetMapping
    public ResponseEntity<List<LoaiCongViec>> getAll() {
        List<LoaiCongViec> list = service.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{maLoaiCv}")
    public ResponseEntity<LoaiCongViec> getById(@PathVariable String maLoaiCv) {
        LoaiCongViec loaiCv = service.getById(maLoaiCv);
        return ResponseEntity.ok(loaiCv);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody LoaiCongViec loaICv) {
        service.insert(loaICv);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody LoaiCongViec loaICv) {
        service.update(loaICv);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maLoaiCv}")
    public ResponseEntity<Void> delete(@PathVariable String maLoaiCv) {
        service.delete(maLoaiCv);
        return ResponseEntity.noContent().build();
    }
}
