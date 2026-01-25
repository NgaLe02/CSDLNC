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

import com.ptit.csdlnc.model.ThamGiaDuAn;
import com.ptit.csdlnc.service.ThamGiaDuAnService;

@RestController
@RequestMapping("api/thamgiaduan")
public class ThamGiaDuAnController {

    @Autowired
    private ThamGiaDuAnService thamGiaDuAnService;

    @GetMapping
    public ResponseEntity<List<ThamGiaDuAn>> getAll() {
        List<ThamGiaDuAn> list = thamGiaDuAnService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/get")
    public ResponseEntity<ThamGiaDuAn> getById(@RequestParam String maNv, @RequestParam String maDa, @RequestParam Integer thang, @RequestParam Integer nam) {
        ThamGiaDuAn thamGiaDuAn = thamGiaDuAnService.getById(maNv, maDa, thang, nam);
        return ResponseEntity.ok(thamGiaDuAn);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody ThamGiaDuAn thamGiaDuAn) {
        thamGiaDuAnService.insert(thamGiaDuAn);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody ThamGiaDuAn thamGiaDuAn) {
        thamGiaDuAnService.update(thamGiaDuAn);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(@RequestParam String maNv, @RequestParam String maDa, @RequestParam Integer thang, @RequestParam Integer nam) {
        thamGiaDuAnService.delete(maNv, maDa, thang, nam);
        return ResponseEntity.noContent().build();
    }
}