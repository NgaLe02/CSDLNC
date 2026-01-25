package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.ThucHienCongViec;
import com.ptit.csdlnc.service.ThucHienCongViecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/thuchiencongviec")
@CrossOrigin(origins = "*")
public class ThucHienCongViecController {

    @Autowired
    private ThucHienCongViecService thucHienCongViecService;

    @GetMapping
    public List<ThucHienCongViec> getAll() {
        return thucHienCongViecService.getAll();
    }

    @GetMapping("/get")
    public ThucHienCongViec getById(@RequestParam String maNv, @RequestParam String maCv, @RequestParam Integer thang, @RequestParam Integer nam) {
        return thucHienCongViecService.getById(maNv, maCv, thang, nam);
    }

    @PostMapping
    public void insert(@RequestBody ThucHienCongViec thucHienCongViec) {
        thucHienCongViecService.insert(thucHienCongViec);
    }

    @PutMapping
    public void update(@RequestBody ThucHienCongViec thucHienCongViec) {
        thucHienCongViecService.update(thucHienCongViec);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam String maNv, @RequestParam String maCv, @RequestParam Integer thang, @RequestParam Integer nam) {
        thucHienCongViecService.delete(maNv, maCv, thang, nam);
    }
}