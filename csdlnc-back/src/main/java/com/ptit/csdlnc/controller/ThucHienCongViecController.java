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

import com.ptit.csdlnc.model.ThucHienCongViec;
import com.ptit.csdlnc.service.ThucHienCongViecService;

@RestController
@RequestMapping("api/thuchiencongviec")
public class ThucHienCongViecController {

    @Autowired
    private ThucHienCongViecService thucHienCongViecService;

    @GetMapping
    public ResponseEntity<List<ThucHienCongViec>> getAll() {
        List<ThucHienCongViec> list = thucHienCongViecService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/get")
    public ResponseEntity<ThucHienCongViec> getById(@RequestParam String maNv, @RequestParam String maCv, @RequestParam Integer thang, @RequestParam Integer nam) {
        ThucHienCongViec thucHienCongViec = thucHienCongViecService.getById(maNv, maCv, thang, nam);
        return ResponseEntity.ok(thucHienCongViec);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody ThucHienCongViec thucHienCongViec) {
        thucHienCongViecService.insert(thucHienCongViec);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody ThucHienCongViec thucHienCongViec) {
        thucHienCongViecService.update(thucHienCongViec);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(@RequestParam String maNv, @RequestParam String maCv, @RequestParam Integer thang, @RequestParam Integer nam) {
        thucHienCongViecService.delete(maNv, maCv, thang, nam);
        return ResponseEntity.noContent().build();
    }
}