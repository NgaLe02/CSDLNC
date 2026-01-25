package com.ptit.csdlnc.controller;

import com.ptit.csdlnc.model.NhanVien;
import com.ptit.csdlnc.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/nhanvien")
@CrossOrigin(origins = "*")
public class NhanVienController {

    @Autowired
    private NhanVienService nhanVienService;

    @GetMapping
    public List<NhanVien> getAll() {
        return nhanVienService.getAll();
    }

    @GetMapping("/{maNv}")
    public NhanVien getById(@PathVariable String maNv) {
        return nhanVienService.getById(maNv);
    }

    @PostMapping
    public void insert(@RequestBody NhanVien nhanVien) {
        nhanVienService.insert(nhanVien);
    }

    @PutMapping
    public void update(@RequestBody NhanVien nhanVien) {
        nhanVienService.update(nhanVien);
    }

    @DeleteMapping("/{maNv}")
    public void delete(@PathVariable String maNv) {
        nhanVienService.delete(maNv);
    }
}