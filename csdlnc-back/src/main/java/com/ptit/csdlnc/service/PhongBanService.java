package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.PhongBanDAO;
import com.ptit.csdlnc.model.PhongBan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhongBanService {

    @Autowired
    private PhongBanDAO phongBanDAO;

    public List<PhongBan> getAll() {
        return phongBanDAO.getAll();
    }

    public PhongBan getById(String maPhong) {
        return phongBanDAO.getById(maPhong);
    }

    public void insert(PhongBan phongBan) {
        phongBanDAO.insert(phongBan);
    }

    public void update(PhongBan phongBan) {
        phongBanDAO.update(phongBan);
    }

    public void delete(String maPhong) {
        phongBanDAO.delete(maPhong);
    }
}