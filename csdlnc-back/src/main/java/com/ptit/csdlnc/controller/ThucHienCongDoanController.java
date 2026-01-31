package com.ptit.csdlnc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.csdlnc.model.ThucHienCongDoan;
import com.ptit.csdlnc.service.ThucHienCongDoanService;

@RestController
@RequestMapping("api/thuchiencongdoan")
public class ThucHienCongDoanController {

    @Autowired
    private ThucHienCongDoanService thucHienCongDoanService;

    @GetMapping
    public ResponseEntity<List<ThucHienCongDoan>> getAll() {
        List<ThucHienCongDoan> list = thucHienCongDoanService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/getLstThucHienCongDoan")
    public ResponseEntity<List<ThucHienCongDoan>> getLstThucHienCongDoan(@RequestParam String maDuAn, @RequestParam String sttCongDoan) {
        List<ThucHienCongDoan> thucHienCongDoan = thucHienCongDoanService.getLstThucHienCongDoan(maDuAn, sttCongDoan);
        return ResponseEntity.ok(thucHienCongDoan);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody ThucHienCongDoan thucHienCongDoan) {
        thucHienCongDoanService.insert(thucHienCongDoan);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody ThucHienCongDoan thucHienCongDoan) {
        thucHienCongDoanService.update(thucHienCongDoan);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(@RequestParam String maNv, @RequestParam String maCd) {
        thucHienCongDoanService.delete(maNv, maCd);
        return ResponseEntity.noContent().build();
    }
}
