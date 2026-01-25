package com.ptit.csdlnc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.NhanVienDAO;
import com.ptit.csdlnc.model.NhanVien;

@Service
public class NhanVienService {

    @Autowired
    private NhanVienDAO nhanVienDAO;

    public List<NhanVien> getAll() {
        return nhanVienDAO.getAll();
    }

    public NhanVien getById(String maNv) {
        return nhanVienDAO.getById(maNv);
    }

    public List<NhanVien> getByMaPhong(String maPhong) {
        return nhanVienDAO.getByMaPhong(maPhong);
    }

    public void insert(NhanVien nhanVien) {
        nhanVienDAO.insert(nhanVien);
    }

    public void update(NhanVien nhanVien) {
        nhanVienDAO.update(nhanVien);
    }

    public void delete(String maNv) {
        nhanVienDAO.delete(maNv);
    }
}