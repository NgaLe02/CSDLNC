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

import com.ptit.csdlnc.model.PhongBan;
import com.ptit.csdlnc.service.PhongBanService;

@RestController
@RequestMapping("api/phongban")
public class PhongBanController {

    @Autowired
    private PhongBanService phongBanService;

    @GetMapping
    public ResponseEntity<List<PhongBan>> getAll() {
        List<PhongBan> list = phongBanService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{maPhong}")
    public ResponseEntity<PhongBan> getById(@PathVariable String maPhong) {
        PhongBan phongBan = phongBanService.getById(maPhong);
        return ResponseEntity.ok(phongBan);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody PhongBan phongBan) {
        phongBanService.insert(phongBan);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody PhongBan phongBan) {
        phongBanService.update(phongBan);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maPhong}")
    public ResponseEntity<Void> delete(@PathVariable String maPhong) {
        phongBanService.delete(maPhong);
        return ResponseEntity.noContent().build();
    }
}