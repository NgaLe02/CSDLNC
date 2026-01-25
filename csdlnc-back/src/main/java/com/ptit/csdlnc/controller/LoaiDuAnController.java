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

import com.ptit.csdlnc.model.LoaiDuAn;
import com.ptit.csdlnc.service.LoaiDuAnService;

@RestController
@RequestMapping("api/loai-du-an")
public class LoaiDuAnController {

    @Autowired
    private LoaiDuAnService loaiDuAnService;

    @GetMapping
    public ResponseEntity<List<LoaiDuAn>> getAll() {
        List<LoaiDuAn> list = loaiDuAnService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{maLoaiDuAn}")
    public ResponseEntity<LoaiDuAn> getById(@PathVariable String maLoaiDuAn) {
        LoaiDuAn loaiDuAn = loaiDuAnService.getById(maLoaiDuAn);
        return ResponseEntity.ok(loaiDuAn);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody LoaiDuAn loaiDuAn) {
        loaiDuAnService.insert(loaiDuAn);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody LoaiDuAn loaiDuAn) {
        loaiDuAnService.update(loaiDuAn);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maLoaiDuAn}")
    public ResponseEntity<Void> delete(@PathVariable String maLoaiDuAn) {
        loaiDuAnService.delete(maLoaiDuAn);
        return ResponseEntity.noContent().build();
    }
}