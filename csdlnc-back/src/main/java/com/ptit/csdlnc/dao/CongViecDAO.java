package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.CongViec;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface CongViecDAO {
    List<CongViec> getAll();
    CongViec getById(String maCv);
    void insert(CongViec congViec);
    void update(CongViec congViec);
    void delete(String maCv);
}