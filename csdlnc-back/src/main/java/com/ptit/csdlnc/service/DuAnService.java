package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.DuAnDAO;
import com.ptit.csdlnc.model.DuAn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DuAnService {

    @Autowired
    private DuAnDAO duAnDAO;

    public List<DuAn> getAll() {
        return duAnDAO.getAll();
    }

    public DuAn getById(String maDa) {
        return duAnDAO.getById(maDa);
    }

    public void insert(DuAn duAn) {
        duAnDAO.insert(duAn);
    }

    public void update(DuAn duAn) {
        duAnDAO.update(duAn);
    }

    public void delete(String maDa) {
        duAnDAO.delete(maDa);
    }
}