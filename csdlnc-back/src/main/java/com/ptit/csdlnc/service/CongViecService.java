package com.ptit.csdlnc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.CongViecDAO;
import com.ptit.csdlnc.dao.ThucHienCongViecDAO;
import com.ptit.csdlnc.model.CongViec;
import com.ptit.csdlnc.model.NhanVien;

@Service
public class CongViecService {

    @Autowired
    private CongViecDAO congViecDAO;

    @Autowired
    private ThucHienCongViecDAO thucHienCongViecDAO;

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

    public List<NhanVien> getNhanVienThamGiaCv(String maCongViec) {
        return congViecDAO.getNhanVienThamGiaCv(maCongViec);
    }

    public List<NhanVien> getNhanVienChuaThamCv(String maCongViec) {
        return congViecDAO.getNhanVienChuaThamCv(maCongViec);
    }

}
