package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.ThucHienCongDoan;
import com.ptit.csdlnc.service.ThucHienCongDoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/thuchiencongdoan")
public class ThucHienCongDoanController {

    @Autowired
    private ThucHienCongDoanService thucHienCongDoanService;

    @GetMapping
    public List<ThucHienCongDoan> getAll() {
        return thucHienCongDoanService.getAll();
    }

    @GetMapping("/get")
    public ThucHienCongDoan getById(@RequestParam String maNv, @RequestParam String maCd) {
        return thucHienCongDoanService.getById(maNv, maCd);
    }

    @PostMapping
    public void insert(@RequestBody ThucHienCongDoan thucHienCongDoan) {
        thucHienCongDoanService.insert(thucHienCongDoan);
    }

    @PutMapping
    public void update(@RequestBody ThucHienCongDoan thucHienCongDoan) {
        thucHienCongDoanService.update(thucHienCongDoan);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam String maNv, @RequestParam String maCd) {
        thucHienCongDoanService.delete(maNv, maCd);
    }
}