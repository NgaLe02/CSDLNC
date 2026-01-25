package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.ThamGiaDuAnDAO;
import com.ptit.csdlnc.model.ThamGiaDuAn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThamGiaDuAnService {

    @Autowired
    private ThamGiaDuAnDAO thamGiaDuAnDAO;

    public List<ThamGiaDuAn> getAll() {
        return thamGiaDuAnDAO.getAll();
    }

    public ThamGiaDuAn getById(String maNv, String maDa, Integer thang, Integer nam) {
        return thamGiaDuAnDAO.getById(maNv, maDa, thang, nam);
    }

    public void insert(ThamGiaDuAn thamGiaDuAn) {
        thamGiaDuAnDAO.insert(thamGiaDuAn);
    }

    public void update(ThamGiaDuAn thamGiaDuAn) {
        thamGiaDuAnDAO.update(thamGiaDuAn);
    }

    public void delete(String maNv, String maDa, Integer thang, Integer nam) {
        thamGiaDuAnDAO.delete(maNv, maDa, thang, nam);
    }
}