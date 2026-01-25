package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.CongDoan;
import com.ptit.csdlnc.service.CongDoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/congdoan")
public class CongDoanController {

    @Autowired
    private CongDoanService congDoanService;

    @GetMapping
    public List<CongDoan> getAll() {
        return congDoanService.getAll();
    }

    @GetMapping("/{maCd}")
    public CongDoan getById(@PathVariable String maCd) {
        return congDoanService.getById(maCd);
    }

    @PostMapping
    public void insert(@RequestBody CongDoan congDoan) {
        congDoanService.insert(congDoan);
    }

    @PutMapping
    public void update(@RequestBody CongDoan congDoan) {
        congDoanService.update(congDoan);
    }

    @DeleteMapping("/{maCd}")
    public void delete(@PathVariable String maCd) {
        congDoanService.delete(maCd);
    }
}