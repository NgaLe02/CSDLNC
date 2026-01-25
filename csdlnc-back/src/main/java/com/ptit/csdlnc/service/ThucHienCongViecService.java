package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.ThucHienCongViecDAO;
import com.ptit.csdlnc.model.ThucHienCongViec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThucHienCongViecService {

    @Autowired
    private ThucHienCongViecDAO thucHienCongViecDAO;

    public List<ThucHienCongViec> getAll() {
        return thucHienCongViecDAO.getAll();
    }

    public ThucHienCongViec getById(String maNv, String maCv, Integer thang, Integer nam) {
        return thucHienCongViecDAO.getById(maNv, maCv, thang, nam);
    }

    public void insert(ThucHienCongViec thucHienCongViec) {
        thucHienCongViecDAO.insert(thucHienCongViec);
    }

    public void update(ThucHienCongViec thucHienCongViec) {
        thucHienCongViecDAO.update(thucHienCongViec);
    }

    public void delete(String maNv, String maCv, Integer thang, Integer nam) {
        thucHienCongViecDAO.delete(maNv, maCv, thang, nam);
    }
}