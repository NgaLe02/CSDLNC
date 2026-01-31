package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.ChucVu;
import com.ptit.csdlnc.model.NhanVien;
import com.ptit.csdlnc.model.XepBacLuong;

@Mapper
public interface NhanVienDAO {

    List<NhanVien> getAll();

    NhanVien getById(String maNhanVien);

    void insertNhanVien(NhanVien nhanVien);

    void update(NhanVien nhanVien);

    void delete(String maNhanVien);

    void activeNhanVien(String maNhanVien);

    int getMaxNhanVienIndexByPhongBan(String maPhongBan);

    void insertChucVu(ChucVu chucVu);

    void insertXepBacLuong(XepBacLuong xepBacLuong);

    List<NhanVien> getByMaPhongBan(String maPhongBan);
}
