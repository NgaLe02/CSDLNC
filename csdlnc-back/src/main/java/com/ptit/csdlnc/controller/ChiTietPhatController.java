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

import com.ptit.csdlnc.model.ChiTietPhat;
import com.ptit.csdlnc.service.ChiTietPhatService;

@RestController
@RequestMapping("api/chitietphat")
public class ChiTietPhatController {

    @Autowired
    private ChiTietPhatService chiTietPhatService;

    @GetMapping
    public ResponseEntity<List<ChiTietPhat>> getAll() {
        List<ChiTietPhat> list = chiTietPhatService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{maPhat}")
    public ResponseEntity<ChiTietPhat> getById(@PathVariable Integer maPhat) {
        ChiTietPhat chiTietPhat = chiTietPhatService.getById(maPhat);
        return ResponseEntity.ok(chiTietPhat);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody ChiTietPhat chiTietPhat) {
        chiTietPhatService.insert(chiTietPhat);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody ChiTietPhat chiTietPhat) {
        chiTietPhatService.update(chiTietPhat);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maPhat}")
    public ResponseEntity<Void> delete(@PathVariable Integer maPhat) {
        chiTietPhatService.delete(maPhat);
        return ResponseEntity.noContent().build();
    }
}