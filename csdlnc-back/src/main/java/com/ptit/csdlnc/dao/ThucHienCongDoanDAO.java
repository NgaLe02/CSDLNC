package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.ThucHienCongDoan;

@Mapper
public interface ThucHienCongDoanDAO {

    List<ThucHienCongDoan> getAll();

    List<ThucHienCongDoan> getByMaDuAn(String maDuAn);

    void insert(ThucHienCongDoan thucHienCongDoan);

    void update(ThucHienCongDoan thucHienCongDoan);

    void delete(String maNv, String maCd);

    public List<ThucHienCongDoan> getLstThucHienCongDoan(String maDuAn, String sttCongDoan);
}
