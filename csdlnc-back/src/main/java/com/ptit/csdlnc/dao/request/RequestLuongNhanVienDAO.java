package com.ptit.csdlnc.dao.request;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RequestLuongNhanVienDAO {

    List<Map<String, Object>> getLuongNhanVien(String keyword, Integer thang, Integer nam, String sortField, String sortOrder);

    public int countNhanVien(String keyword, Integer thang, Integer nam, String sortField, String sortOrder);
}
