package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.ThucHienCongDoanDAO;
import com.ptit.csdlnc.model.ThucHienCongDoan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThucHienCongDoanService {

    @Autowired
    private ThucHienCongDoanDAO thucHienCongDoanDAO;

    public List<ThucHienCongDoan> getAll() {
        return thucHienCongDoanDAO.getAll();
    }

    public ThucHienCongDoan getById(String maNv, String maCd) {
        return thucHienCongDoanDAO.getById(maNv, maCd);
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