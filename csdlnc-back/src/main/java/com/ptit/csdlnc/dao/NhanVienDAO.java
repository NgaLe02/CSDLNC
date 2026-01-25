package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.NhanVien;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface NhanVienDAO {
    List<NhanVien> getAll();
    NhanVien getById(String maNv);
    void insert(NhanVien nhanVien);
    void update(NhanVien nhanVien);
    void delete(String maNv);
}