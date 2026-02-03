package com.ptit.csdlnc.service.request;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.request.RequestDuAnDAO;

@Service
public class RequestDuAnService {

    @Autowired
    private RequestDuAnDAO requestDao;

    public Map<String, Object> getLstDuAn(String tenDuAn, Integer thang, Integer nam) {
        Map<String, Object> result = new HashMap<>();
        result.put("list", requestDao.getLstDuAn(tenDuAn, thang, nam));
        result.put("count", requestDao.getCountLstDuAn(tenDuAn, thang, nam));
        return result;
    }

    public Map<String, Object> getCongDoanDuAn(String maDuAn) {
        Map<String, Object> result = new HashMap<>();
        result.put("list", requestDao.getCongDoanDuAn(maDuAn));
        return result;
    }

}
