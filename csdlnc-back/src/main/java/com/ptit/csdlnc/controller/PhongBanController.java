package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.PhongBan;
import com.ptit.csdlnc.service.PhongBanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/phongban")
@CrossOrigin(origins = "*")
public class PhongBanController {

    @Autowired
    private PhongBanService phongBanService;

    @GetMapping
    public List<PhongBan> getAll() {
        return phongBanService.getAll();
    }

    @GetMapping("/{maPhong}")
    public PhongBan getById(@PathVariable String maPhong) {
        return phongBanService.getById(maPhong);
    }

    @PostMapping
    public void insert(@RequestBody PhongBan phongBan) {
        phongBanService.insert(phongBan);
    }

    @PutMapping
    public void update(@RequestBody PhongBan phongBan) {
        phongBanService.update(phongBan);
    }

    @DeleteMapping("/{maPhong}")
    public void delete(@PathVariable String maPhong) {
        phongBanService.delete(maPhong);
    }
}