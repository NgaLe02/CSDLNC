package com.ptit.csdlnc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ptit.csdlnc.dao.DuAnDAO;
import com.ptit.csdlnc.dao.ThamGiaDuAnDAO;
import com.ptit.csdlnc.model.DuAn;

@Service
public class DuAnService {

    @Autowired
    private DuAnDAO duAnDAO;

     @Autowired
    private ThamGiaDuAnDAO thamGiaDuAnDAO;


    public List<DuAn> getAll() {
        return duAnDAO.getAll();
    }

    public DuAn getById(String maDa) {
        return duAnDAO.getById(maDa);
    }

    public void insert(DuAn duAn) {
        duAnDAO.insert(duAn);
    }

    @Transactional
    public void update(DuAn duAn) {
        duAnDAO.update(duAn);
    }

    public void delete(String maDa) {
        duAnDAO.delete(maDa);
    }
}