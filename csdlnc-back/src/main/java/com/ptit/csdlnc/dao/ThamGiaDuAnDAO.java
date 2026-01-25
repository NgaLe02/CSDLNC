package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.ThamGiaDuAn;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ThamGiaDuAnDAO {
    List<ThamGiaDuAn> getAll();
    ThamGiaDuAn getById(String maNv, String maDa, Integer thang, Integer nam);
    void insert(ThamGiaDuAn thamGiaDuAn);
    void update(ThamGiaDuAn thamGiaDuAn);
    void delete(String maNv, String maDa, Integer thang, Integer nam);
}