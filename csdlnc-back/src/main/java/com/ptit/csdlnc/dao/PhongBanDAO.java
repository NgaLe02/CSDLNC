package com.ptit.csdlnc.dao;

import com.ptit.csdlnc.model.PhongBan;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface PhongBanDAO {
    List<PhongBan> getAll();
    PhongBan getById(String maPhong);
    void insert(PhongBan phongBan);
    void update(PhongBan phongBan);
    void delete(String maPhong);
}