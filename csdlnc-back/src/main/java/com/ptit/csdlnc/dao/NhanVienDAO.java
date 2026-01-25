package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.NhanVien;

@Mapper
public interface NhanVienDAO {
    List<NhanVien> getAll();
    NhanVien getById(String maNv);
    List<NhanVien> getByMaPhong(String maPhong);
    void insert(NhanVien nhanVien);
    void update(NhanVien nhanVien);
    void delete(String maNv);
}