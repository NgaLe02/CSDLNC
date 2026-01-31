package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.CongDoan;

@Mapper
public interface CongDoanDAO {

    List<CongDoan> getByMaDuAn(String maDuAn);

    CongDoan getById(String maCd);

    void insert(CongDoan congDoan);

    void update(CongDoan congDoan);

    void delete(String maDuAn, String sttCongDoan);

    int countCongDoanByMaDuAn(String maDuAn);
}
