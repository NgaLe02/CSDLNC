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

import com.ptit.csdlnc.model.CongViec;
import com.ptit.csdlnc.service.CongViecService;

@RestController
@RequestMapping("api/congviec")
public class CongViecController {

    @Autowired
    private CongViecService congViecService;

    @GetMapping
    public ResponseEntity<List<CongViec>> getAll() {
        List<CongViec> list = congViecService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{maCv}")
    public ResponseEntity<CongViec> getById(@PathVariable String maCv) {
        CongViec congViec = congViecService.getById(maCv);
        return ResponseEntity.ok(congViec);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody CongViec congViec) {
        congViecService.insert(congViec);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody CongViec congViec) {
        congViecService.update(congViec);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maCv}")
    public ResponseEntity<Void> delete(@PathVariable String maCv) {
        congViecService.delete(maCv);
        return ResponseEntity.noContent().build();
    }
}