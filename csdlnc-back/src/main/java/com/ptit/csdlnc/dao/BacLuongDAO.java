package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.BacLuong;

@Mapper
public interface BacLuongDAO {

    List<BacLuong> getAll();

    BacLuong getById(String maBacLuong);

    void insert(BacLuong bacLuong);

    void update(BacLuong bacLuong);

    void delete(String maBacLuong);
}
