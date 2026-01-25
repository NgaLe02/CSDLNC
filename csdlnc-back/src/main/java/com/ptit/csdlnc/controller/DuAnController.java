package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.DuAn;
import com.ptit.csdlnc.service.DuAnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/duan")
@CrossOrigin(origins = "*")
public class DuAnController {

    @Autowired
    private DuAnService duAnService;

    @GetMapping
    public List<DuAn> getAll() {
        return duAnService.getAll();
    }

    @GetMapping("/{maDa}")
    public DuAn getById(@PathVariable String maDa) {
        return duAnService.getById(maDa);
    }

    @PostMapping
    public void insert(@RequestBody DuAn duAn) {
        duAnService.insert(duAn);
    }

    @PutMapping
    public void update(@RequestBody DuAn duAn) {
        duAnService.update(duAn);
    }

    @DeleteMapping("/{maDa}")
    public void delete(@PathVariable String maDa) {
        duAnService.delete(maDa);
    }
}