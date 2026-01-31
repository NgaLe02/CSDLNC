package com.ptit.csdlnc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.LoaiCongViecDAO;
import com.ptit.csdlnc.model.LoaiCongViec;
import com.ptit.csdlnc.model.LoaiDuAn;

@Service
public class LoaiCongViecService {

    @Autowired
    private LoaiCongViecDAO loaiCvDAO;

    public List<LoaiCongViec> getAll() {
        return loaiCvDAO.getAll();
    }

    public LoaiCongViec getById(String maLoaiDuAn) {
        return loaiCvDAO.getById(maLoaiDuAn);
    }

    public void insert(LoaiCongViec loaiCv) {
        loaiCvDAO.insert(loaiCv);
    }

    public void update(LoaiCongViec loaiCv) {
        loaiCvDAO.update(loaiCv);
    }

    public void delete(String maLoaiDuAn) {
        loaiCvDAO.delete(maLoaiDuAn);
    }
}
