package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.ChiTietPhat;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ChiTietPhatDAO {
    List<ChiTietPhat> getAll();
    ChiTietPhat getById(Integer maPhat);
    void insert(ChiTietPhat chiTietPhat);
    void update(ChiTietPhat chiTietPhat);
    void delete(Integer maPhat);
}