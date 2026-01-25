package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.ChiTietPhat;
import com.ptit.csdlnc.service.ChiTietPhatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/chitietphat")
@CrossOrigin(origins = "*")
public class ChiTietPhatController {

    @Autowired
    private ChiTietPhatService chiTietPhatService;

    @GetMapping
    public List<ChiTietPhat> getAll() {
        return chiTietPhatService.getAll();
    }

    @GetMapping("/{maPhat}")
    public ChiTietPhat getById(@PathVariable Integer maPhat) {
        return chiTietPhatService.getById(maPhat);
    }

    @PostMapping
    public void insert(@RequestBody ChiTietPhat chiTietPhat) {
        chiTietPhatService.insert(chiTietPhat);
    }

    @PutMapping
    public void update(@RequestBody ChiTietPhat chiTietPhat) {
        chiTietPhatService.update(chiTietPhat);
    }

    @DeleteMapping("/{maPhat}")
    public void delete(@PathVariable Integer maPhat) {
        chiTietPhatService.delete(maPhat);
    }
}