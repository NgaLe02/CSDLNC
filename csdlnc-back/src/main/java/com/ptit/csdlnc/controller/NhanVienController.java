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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.csdlnc.model.NhanVien;
import com.ptit.csdlnc.service.NhanVienService;

@RestController
@RequestMapping("api/nhanvien")
public class NhanVienController {

    @Autowired
    private NhanVienService nhanVienService;

    @GetMapping
    public ResponseEntity<List<NhanVien>> getAll() {
        List<NhanVien> list = nhanVienService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{maNv}")
    public ResponseEntity<NhanVien> getById(@PathVariable String maNv) {
        NhanVien nhanVien = nhanVienService.getById(maNv);
        return ResponseEntity.ok(nhanVien);
    }

    @GetMapping("/by-phong")
    public ResponseEntity<List<NhanVien>> getByMaPhong(@RequestParam String maPhong) {
        List<NhanVien> list = nhanVienService.getByMaPhong(maPhong);
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody NhanVien nhanVien) {
        nhanVienService.insert(nhanVien);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody NhanVien nhanVien) {
        nhanVienService.update(nhanVien);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maNv}")
    public ResponseEntity<Void> delete(@PathVariable String maNv) {
        nhanVienService.delete(maNv);
        return ResponseEntity.noContent().build();
    }
}