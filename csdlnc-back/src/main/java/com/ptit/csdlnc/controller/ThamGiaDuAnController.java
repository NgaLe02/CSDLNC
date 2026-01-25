package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.ThamGiaDuAn;
import com.ptit.csdlnc.service.ThamGiaDuAnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/thamgiaduan")
@CrossOrigin(origins = "*")
public class ThamGiaDuAnController {

    @Autowired
    private ThamGiaDuAnService thamGiaDuAnService;

    @GetMapping
    public List<ThamGiaDuAn> getAll() {
        return thamGiaDuAnService.getAll();
    }

    @GetMapping("/get")
    public ThamGiaDuAn getById(@RequestParam String maNv, @RequestParam String maDa, @RequestParam Integer thang, @RequestParam Integer nam) {
        return thamGiaDuAnService.getById(maNv, maDa, thang, nam);
    }

    @PostMapping
    public void insert(@RequestBody ThamGiaDuAn thamGiaDuAn) {
        thamGiaDuAnService.insert(thamGiaDuAn);
    }

    @PutMapping
    public void update(@RequestBody ThamGiaDuAn thamGiaDuAn) {
        thamGiaDuAnService.update(thamGiaDuAn);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam String maNv, @RequestParam String maDa, @RequestParam Integer thang, @RequestParam Integer nam) {
        thamGiaDuAnService.delete(maNv, maDa, thang, nam);
    }
}