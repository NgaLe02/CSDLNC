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

import com.ptit.csdlnc.model.BacLuong;
import com.ptit.csdlnc.service.BacLuongService;

@RestController
@RequestMapping("api/bac-luong")
public class BacLuongController {

    @Autowired
    private BacLuongService bacLuongService;

    @GetMapping
    public ResponseEntity<List<BacLuong>> getAll() {
        return ResponseEntity.ok(bacLuongService.getAll());
    }

    @GetMapping("/{maBacLuong}")
    public ResponseEntity<BacLuong> getById(@PathVariable String maBacLuong) {
        BacLuong bacLuong = bacLuongService.getById(maBacLuong);
        return ResponseEntity.ok(bacLuong);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody BacLuong bacLuong) {
        bacLuongService.insert(bacLuong);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody BacLuong bacLuong) {
        bacLuongService.update(bacLuong);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maBacLuong}")
    public ResponseEntity<Void> delete(@PathVariable String maBacLuong) {
        bacLuongService.delete(maBacLuong);
        return ResponseEntity.noContent().build();
    }
}
