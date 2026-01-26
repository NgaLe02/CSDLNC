package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.DuAn;
import com.ptit.csdlnc.model.NhanVien;

@Mapper
public interface DuAnDAO {
    List<DuAn> getAll();
    DuAn getById(String maDa);
    List<NhanVien> getAssignedEmployees(String maDa, String thang, String nam);
    void insert(DuAn duAn);
    void update(DuAn duAn);
    void delete(String maDa);
}