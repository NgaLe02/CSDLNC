package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.DuAn;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface DuAnDAO {
    List<DuAn> getAll();
    DuAn getById(String maDa);
    void insert(DuAn duAn);
    void update(DuAn duAn);
    void delete(String maDa);
}