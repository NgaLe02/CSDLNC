package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.ChiTietPhatDAO;
import com.ptit.csdlnc.model.ChiTietPhat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChiTietPhatService {

    @Autowired
    private ChiTietPhatDAO chiTietPhatDAO;

    public List<ChiTietPhat> getAll() {
        return chiTietPhatDAO.getAll();
    }

    public ChiTietPhat getById(Integer maPhat) {
        return chiTietPhatDAO.getById(maPhat);
    }

    public void insert(ChiTietPhat chiTietPhat) {
        chiTietPhatDAO.insert(chiTietPhat);
    }

    public void update(ChiTietPhat chiTietPhat) {
        chiTietPhatDAO.update(chiTietPhat);
    }

    public void delete(Integer maPhat) {
        chiTietPhatDAO.delete(maPhat);
    }
}