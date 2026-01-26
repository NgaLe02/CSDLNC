package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.ThamGiaDuAn;

@Mapper
public interface ThamGiaDuAnDAO {
    List<ThamGiaDuAn> getAll();
    List<ThamGiaDuAn> getByMaDA(String maDa);
    ThamGiaDuAn getById(String maNv, String maDa, Integer thang, Integer nam);
    void insert(ThamGiaDuAn thamGiaDuAn);
    void update(ThamGiaDuAn thamGiaDuAn);
    void delete(String maNv, String maDa, Integer thang, Integer nam);
}