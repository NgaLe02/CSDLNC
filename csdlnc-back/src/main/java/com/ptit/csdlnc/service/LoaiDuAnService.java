package com.ptit.csdlnc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.LoaiDuAnDAO;
import com.ptit.csdlnc.model.LoaiDuAn;

@Service
public class LoaiDuAnService {

    @Autowired
    private LoaiDuAnDAO loaiDuAnDAO;

    public List<LoaiDuAn> getAll() {
        return loaiDuAnDAO.getAll();
    }

    public LoaiDuAn getById(String maLoaiDuAn) {
        return loaiDuAnDAO.getById(maLoaiDuAn);
    }

    public void insert(LoaiDuAn loaiDuAn) {
        loaiDuAnDAO.insert(loaiDuAn);
    }

    public void update(LoaiDuAn loaiDuAn) {
        loaiDuAnDAO.update(loaiDuAn);
    }

    public void delete(String maLoaiDuAn) {
        loaiDuAnDAO.delete(maLoaiDuAn);
    }
}