package com.ptit.csdlnc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.BacLuongDAO;
import com.ptit.csdlnc.model.BacLuong;

@Service
public class BacLuongService {

    @Autowired
    private BacLuongDAO bacLuongDAO;

    public List<BacLuong> getAll() {
        return bacLuongDAO.getAll();
    }

    public BacLuong getById(String maBacLuong) {
        return bacLuongDAO.getById(maBacLuong);
    }

    public void insert(BacLuong bacLuong) {
        bacLuongDAO.insert(bacLuong);
    }

    public void update(BacLuong bacLuong) {
        bacLuongDAO.update(bacLuong);
    }

    public void delete(String maBacLuong) {
        bacLuongDAO.delete(maBacLuong);
    }
}
