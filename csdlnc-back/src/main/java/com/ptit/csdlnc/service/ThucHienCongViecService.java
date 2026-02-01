package com.ptit.csdlnc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ptit.csdlnc.dao.ThucHienCongViecDAO;
import com.ptit.csdlnc.model.ThucHienCongViec;

@Service
public class ThucHienCongViecService {

    @Autowired
    private ThucHienCongViecDAO thucHienCongViecDAO;

    public List<ThucHienCongViec> getLstThucHienCongViec(String maCv) {
        return thucHienCongViecDAO.getLstThucHienCongViec(maCv);
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

    public void delete(String maNv, String maCv) {
        thucHienCongViecDAO.delete(maNv, maCv);
    }

    @Transactional
    public void insertListNvThamGiaDuan(String maCv, List<String> lstNhanVien) {
        ThucHienCongViec model = new ThucHienCongViec();
        model.setMaCv(maCv);
        for (String maNhanVien : lstNhanVien) {
            model.setMaNv(maNhanVien);
            thucHienCongViecDAO.insert(model);
        }
    }
}
