package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.BangLuong;
import com.ptit.csdlnc.service.BangLuongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/bangluong")
@CrossOrigin(origins = "*")
public class BangLuongController {

    @Autowired
    private BangLuongService bangLuongService;

    @GetMapping
    public List<BangLuong> getAll() {
        return bangLuongService.getAll();
    }

    @GetMapping("/{maBangLuong}")
    public BangLuong getById(@PathVariable Integer maBangLuong) {
        return bangLuongService.getById(maBangLuong);
    }

    @PostMapping
    public void insert(@RequestBody BangLuong bangLuong) {
        bangLuongService.insert(bangLuong);
    }

    @PutMapping
    public void update(@RequestBody BangLuong bangLuong) {
        bangLuongService.update(bangLuong);
    }

    @DeleteMapping("/{maBangLuong}")
    public void delete(@PathVariable Integer maBangLuong) {
        bangLuongService.delete(maBangLuong);
    }
}