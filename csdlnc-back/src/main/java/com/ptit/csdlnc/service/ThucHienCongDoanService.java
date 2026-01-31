package com.ptit.csdlnc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.ThucHienCongDoanDAO;
import com.ptit.csdlnc.model.ThucHienCongDoan;

@Service
public class ThucHienCongDoanService {

    @Autowired
    private ThucHienCongDoanDAO thucHienCongDoanDAO;

    public List<ThucHienCongDoan> getAll() {
        return thucHienCongDoanDAO.getAll();
    }

    public List<ThucHienCongDoan> getLstThucHienCongDoan(String maDuAn, String sttCongDoan) {
        return thucHienCongDoanDAO.getLstThucHienCongDoan(maDuAn, sttCongDoan);
    }

    public void insert(ThucHienCongDoan thucHienCongDoan) {
        thucHienCongDoanDAO.insert(thucHienCongDoan);
    }

    public void update(ThucHienCongDoan thucHienCongDoan) {
        thucHienCongDoanDAO.update(thucHienCongDoan);
    }

    public void delete(String maNv, String maCd) {
        thucHienCongDoanDAO.delete(maNv, maCd);
    }
}
