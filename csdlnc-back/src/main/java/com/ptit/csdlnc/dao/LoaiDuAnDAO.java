package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.LoaiDuAn;

@Mapper
public interface LoaiDuAnDAO {
    List<LoaiDuAn> getAll();
    LoaiDuAn getById(String maLoaiDuAn);
    void insert(LoaiDuAn loaiDuAn);
    void update(LoaiDuAn loaiDuAn);
    void delete(String maLoaiDuAn);
}