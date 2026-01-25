package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.ThucHienCongViec;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ThucHienCongViecDAO {
    List<ThucHienCongViec> getAll();
    ThucHienCongViec getById(String maNv, String maCv, Integer thang, Integer nam);
    void insert(ThucHienCongViec thucHienCongViec);
    void update(ThucHienCongViec thucHienCongViec);
    void delete(String maNv, String maCv, Integer thang, Integer nam);
}