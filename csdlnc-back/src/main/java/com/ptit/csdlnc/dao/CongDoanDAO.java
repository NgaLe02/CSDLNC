package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.CongDoan;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface CongDoanDAO {
    List<CongDoan> getAll();
    CongDoan getById(String maCd);
    void insert(CongDoan congDoan);
    void update(CongDoan congDoan);
    void delete(String maCd);
}