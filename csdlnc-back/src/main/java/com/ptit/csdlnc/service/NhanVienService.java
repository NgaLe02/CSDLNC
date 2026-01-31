package com.ptit.csdlnc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public void insert(NhanVien nhanVien) {
        int maxIndex = nhanVienDAO.getMaxNhanVienIndexByPhongBan(nhanVien.getPhanCong().getMaPhongBan());

        // 2. Sinh mã nhân viên
        String maNv = nhanVien.getPhanCong().getMaPhongBan() + String.format("%04d", maxIndex + 1);
        nhanVien.setMaNhanVien(maNv);

        nhanVien.getPhanCong().setMaNhanVien(maNv);
        nhanVien.getXepBacLuong().setMaNhanVien(maNv);

        nhanVienDAO.insertNhanVien(nhanVien);
        nhanVienDAO.insertChucVu(nhanVien.getPhanCong());
        nhanVienDAO.insertXepBacLuong(nhanVien.getXepBacLuong());
    }

    @Transactional
    public void update(NhanVien nhanVien) {
        nhanVien.getPhanCong().setMaNhanVien(nhanVien.getMaNhanVien());
        nhanVien.getXepBacLuong().setMaNhanVien(nhanVien.getMaNhanVien());

        nhanVienDAO.update(nhanVien);
        nhanVienDAO.insertChucVu(nhanVien.getPhanCong());
        nhanVienDAO.insertXepBacLuong(nhanVien.getXepBacLuong());
    }

    public void activeNhanVien(String maNv) {
        nhanVienDAO.activeNhanVien(maNv);
    }

    public void delete(String maNv) {
        nhanVienDAO.delete(maNv);
    }

    public List<NhanVien> getByMaPhongBan(String maPhongBan) {
        return nhanVienDAO.getByMaPhongBan(maPhongBan);
    }
}
