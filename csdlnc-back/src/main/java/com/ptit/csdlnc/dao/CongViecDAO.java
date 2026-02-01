package com.ptit.csdlnc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.CongViec;
import com.ptit.csdlnc.model.NhanVien;

@Mapper
public interface CongViecDAO {

    List<CongViec> getAll();

    CongViec getById(String maCv);

    void insert(CongViec congViec);

    void update(CongViec congViec);

    void delete(String maCv);

    List<NhanVien> getNhanVienThamGiaCv(String maCongViec);

    public List<NhanVien> getNhanVienChuaThamCv(String maCongViec);
}
