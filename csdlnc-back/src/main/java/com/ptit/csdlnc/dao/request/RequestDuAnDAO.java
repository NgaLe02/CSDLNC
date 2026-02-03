package com.ptit.csdlnc.dao.request;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RequestDuAnDAO {

    List<Map<String, Object>> getLstDuAn(String tenDuAn, Integer thang, Integer nam);

    int getCountLstDuAn(String tenDuAn, Integer thang, Integer nam);

    List<Map<String, Object>> getCongDoanDuAn(String maDuAn);

}
