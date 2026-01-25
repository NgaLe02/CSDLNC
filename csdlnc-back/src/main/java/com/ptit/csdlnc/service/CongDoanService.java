package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.CongDoanDAO;
import com.ptit.csdlnc.model.CongDoan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CongDoanService {

    @Autowired
    private CongDoanDAO congDoanDAO;

    public List<CongDoan> getAll() {
        return congDoanDAO.getAll();
    }

    public CongDoan getById(String maCd) {
        return congDoanDAO.getById(maCd);
    }

    public void insert(CongDoan congDoan) {
        congDoanDAO.insert(congDoan);
    }

    public void update(CongDoan congDoan) {
        congDoanDAO.update(congDoan);
    }

    public void delete(String maCd) {
        congDoanDAO.delete(maCd);
    }
}