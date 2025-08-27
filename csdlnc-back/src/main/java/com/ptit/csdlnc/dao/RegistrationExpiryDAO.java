package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.RegistrationExpiry;
import com.ptit.csdlnc.model.response.RegistrationExpiryResponse;

@Mapper
public interface RegistrationExpiryDAO {
	List<RegistrationExpiryResponse> getLstRegistrationExpiry(Map<String, Object> params) throws Exception;

	int insertRegistrationExpiry(RegistrationExpiry model) throws Exception;

	int updateRegistrationExpiry(RegistrationExpiry model) throws Exception;

	int deleteRegistrationExpiry(int id) throws Exception;

}
