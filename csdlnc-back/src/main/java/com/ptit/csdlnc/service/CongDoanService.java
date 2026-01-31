package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ptit.csdlnc.dao.CongDoanDAO;
import com.ptit.csdlnc.model.CongDoan;

@Service
public class CongDoanService {

    @Autowired
    private CongDoanDAO congDoanDAO;

    public List<CongDoan> getByMaDuAn(String maDuAn) {
        return congDoanDAO.getByMaDuAn(maDuAn);
    }

    public CongDoan getById(String maCd) {
        return congDoanDAO.getById(maCd);
    }

    @Transactional
    public void insert(CongDoan congDoan) {
        int countCdInDuAn = congDoanDAO.countCongDoanByMaDuAn(congDoan.getMaDuAn());
        congDoan.setSttCongDoan(countCdInDuAn + 1);
        congDoanDAO.insert(congDoan);
    }

    public void update(CongDoan congDoan) {
        congDoanDAO.update(congDoan);
    }

    public void delete(String maDuAn, String sttCongDoan) {
        congDoanDAO.delete(maDuAn, sttCongDoan);
    }

    public List<Map<String, Object>> getNhanVienTheoCongDoan(
            String maDuAn,
            Integer sttCongDoan
    ) {
        return congDoanDAO.getNhanVienThamGiaTrongThoiGianCongDoan(maDuAn, sttCongDoan);
    }

}
