package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.BangLuong;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface BangLuongDAO {
    List<BangLuong> getAll();
    BangLuong getById(Integer maBangLuong);
    void insert(BangLuong bangLuong);
    void update(BangLuong bangLuong);
    void delete(Integer maBangLuong);
}