package com.ptit.csdlnc.service.request;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.request.RequestLuongNhanVienDAO;

@Service
public class RequestLuongNhanVienService {

    @Autowired
    private RequestLuongNhanVienDAO requestDao;

    public Map<String, Object> getLuongNhanVien(String keyword, Integer thang, Integer nam, String sortField, String sortOrder) {
        Map<String, Object> result = new HashMap<>();
        result.put("list", requestDao.getLuongNhanVien(keyword, thang, nam, sortField, sortOrder));
        result.put("count", requestDao.countNhanVien(keyword, thang, nam, sortField, sortOrder));
        return result;
    }

}
