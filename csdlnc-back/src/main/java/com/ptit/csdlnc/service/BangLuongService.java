package com.ptit.csdlnc.service;

import com.ptit.csdlnc.dao.BangLuongDAO;
import com.ptit.csdlnc.model.BangLuong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BangLuongService {

    @Autowired
    private BangLuongDAO bangLuongDAO;

    public List<BangLuong> getAll() {
        return bangLuongDAO.getAll();
    }

    public BangLuong getById(Integer maBangLuong) {
        return bangLuongDAO.getById(maBangLuong);
    }

    public void insert(BangLuong bangLuong) {
        bangLuongDAO.insert(bangLuong);
    }

    public void update(BangLuong bangLuong) {
        bangLuongDAO.update(bangLuong);
    }

    public void delete(Integer maBangLuong) {
        bangLuongDAO.delete(maBangLuong);
    }
}