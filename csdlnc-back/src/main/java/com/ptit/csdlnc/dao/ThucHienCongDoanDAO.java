package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.ThucHienCongDoan;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ThucHienCongDoanDAO {
    List<ThucHienCongDoan> getAll();
    ThucHienCongDoan getById(String maNv, String maCd);
    void insert(ThucHienCongDoan thucHienCongDoan);
    void update(ThucHienCongDoan thucHienCongDoan);
    void delete(String maNv, String maCd);
}