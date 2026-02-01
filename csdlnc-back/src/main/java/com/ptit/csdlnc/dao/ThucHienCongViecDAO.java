package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.ThucHienCongViec;

@Mapper
public interface ThucHienCongViecDAO {

    List<ThucHienCongViec> getLstThucHienCongViec(String maCv);

    ThucHienCongViec getById(String maNv, String maCv, Integer thang, Integer nam);

    void insert(ThucHienCongViec thucHienCongViec);

    void update(ThucHienCongViec thucHienCongViec);

    void delete(String maNv, String maCv);
}
