package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.CongViecDAO;
import com.ptit.csdlnc.model.CongViec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CongViecService {

    @Autowired
    private CongViecDAO congViecDAO;

    public List<CongViec> getAll() {
        return congViecDAO.getAll();
    }

    public CongViec getById(String maCv) {
        return congViecDAO.getById(maCv);
    }

    public void insert(CongViec congViec) {
        congViecDAO.insert(congViec);
    }

    public void update(CongViec congViec) {
        congViecDAO.update(congViec);
    }

    public void delete(String maCv) {
        congViecDAO.delete(maCv);
    }
}