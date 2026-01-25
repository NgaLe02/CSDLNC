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

import com.ptit.csdlnc.model.DuAn;
import com.ptit.csdlnc.service.DuAnService;

@RestController
@RequestMapping("api/duan")
public class DuAnController {

    @Autowired
    private DuAnService duAnService;

    @GetMapping
    public ResponseEntity<List<DuAn>> getAll() {
        List<DuAn> list = duAnService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{maDa}")
    public ResponseEntity<DuAn> getById(@PathVariable String maDa) {
        DuAn duAn = duAnService.getById(maDa);
        return ResponseEntity.ok(duAn);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody DuAn duAn) {
        duAnService.insert(duAn);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody DuAn duAn) {
        duAnService.update(duAn);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maDa}")
    public ResponseEntity<Void> delete(@PathVariable String maDa) {
        duAnService.delete(maDa);
        return ResponseEntity.noContent().build();
    }
}