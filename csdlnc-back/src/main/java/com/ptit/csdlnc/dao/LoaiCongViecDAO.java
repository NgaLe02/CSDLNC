package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.LoaiCongViec;

@Mapper
public interface LoaiCongViecDAO {

    List<LoaiCongViec> getAll();

    LoaiCongViec getById(String maLoaiCv);

    void insert(LoaiCongViec loaiCv);

    void update(LoaiCongViec loaiCv);

    void delete(String maLoaiDuAn);
}
