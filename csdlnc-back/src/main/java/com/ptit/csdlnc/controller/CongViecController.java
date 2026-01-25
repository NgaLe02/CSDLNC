package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.CongViec;
import com.ptit.csdlnc.service.CongViecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/congviec")
public class CongViecController {

    @Autowired
    private CongViecService congViecService;

    @GetMapping
    public List<CongViec> getAll() {
        return congViecService.getAll();
    }

    @GetMapping("/{maCv}")
    public CongViec getById(@PathVariable String maCv) {
        return congViecService.getById(maCv);
    }

    @PostMapping
    public void insert(@RequestBody CongViec congViec) {
        congViecService.insert(congViec);
    }

    @PutMapping
    public void update(@RequestBody CongViec congViec) {
        congViecService.update(congViec);
    }

    @DeleteMapping("/{maCv}")
    public void delete(@PathVariable String maCv) {
        congViecService.delete(maCv);
    }
}