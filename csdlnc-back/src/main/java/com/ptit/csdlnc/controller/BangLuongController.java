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

import com.ptit.csdlnc.model.BangLuong;
import com.ptit.csdlnc.service.BangLuongService;

@RestController
@RequestMapping("api/bangluong")
public class BangLuongController {

    @Autowired
    private BangLuongService bangLuongService;

    @GetMapping
    public ResponseEntity<List<BangLuong>> getAll() {
        List<BangLuong> list = bangLuongService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{maBangLuong}")
    public ResponseEntity<BangLuong> getById(@PathVariable Integer maBangLuong) {
        BangLuong bangLuong = bangLuongService.getById(maBangLuong);
        return ResponseEntity.ok(bangLuong);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody BangLuong bangLuong) {
        bangLuongService.insert(bangLuong);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody BangLuong bangLuong) {
        bangLuongService.update(bangLuong);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maBangLuong}")
    public ResponseEntity<Void> delete(@PathVariable Integer maBangLuong) {
        bangLuongService.delete(maBangLuong);
        return ResponseEntity.noContent().build();
    }
}