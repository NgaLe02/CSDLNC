package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.NhanVienDAO;
import com.ptit.csdlnc.model.NhanVien;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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