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

import com.ptit.csdlnc.model.CongDoan;
import com.ptit.csdlnc.service.CongDoanService;

@RestController
@RequestMapping("api/congdoan")
public class CongDoanController {

    @Autowired
    private CongDoanService congDoanService;

    @GetMapping("getByMaDuAn")
    public ResponseEntity<List<CongDoan>> getByMaDuAn(@RequestParam String maDuAn) {
        List<CongDoan> list = congDoanService.getByMaDuAn(maDuAn);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{maCd}")
    public ResponseEntity<CongDoan> getById(@PathVariable String maCd) {
        CongDoan congDoan = congDoanService.getById(maCd);
        return ResponseEntity.ok(congDoan);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody CongDoan congDoan) {
        congDoanService.insert(congDoan);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody CongDoan congDoan) {
        congDoanService.update(congDoan);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("")
    public ResponseEntity<Void> delete(@RequestParam String maDuAn, @RequestParam String sttCongDoan) {
        congDoanService.delete(maDuAn, sttCongDoan);
        return ResponseEntity.noContent().build();
    }
}
