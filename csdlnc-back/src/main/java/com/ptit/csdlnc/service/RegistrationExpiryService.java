package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.RegistrationExpiryDAO;
import com.ptit.csdlnc.model.RegistrationExpiry;
import com.ptit.csdlnc.model.response.RegistrationExpiryResponse;

@Service
public class RegistrationExpiryService {
	@Autowired
	RegistrationExpiryDAO rgistrationExpiryDAO;

	public List<RegistrationExpiryResponse> getLstRegistrationExpiry(Map<String, Object> params) throws Exception {
		List<RegistrationExpiryResponse> result = rgistrationExpiryDAO.getLstRegistrationExpiry(params);
		return result;
	}

	public int insertRegistrationExpiry(RegistrationExpiry model) throws Exception {
		try {
			return rgistrationExpiryDAO.insertRegistrationExpiry(model);
		} catch (DataIntegrityViolationException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);
			} else {
				throw new RuntimeException("Dữ liệu không hợp lệ!");
			}
		}
	}

	public int updateRegistrationExpiry(RegistrationExpiry model) throws Exception {
		try {
			return rgistrationExpiryDAO.updateRegistrationExpiry(model);
		} catch (DataIntegrityViolationException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);
			} else {
				throw new RuntimeException("Dữ liệu không hợp lệ!");
			}
		}
	}

	public int deleteRegistrationExpiry(int id) throws Exception {
		return rgistrationExpiryDAO.deleteRegistrationExpiry(id);
	}

	public List<RegistrationExpiryResponse> getLstRegistrationExpiryToCar(String maXe) throws Exception {
		List<RegistrationExpiryResponse> result = rgistrationExpiryDAO.getLstRegistrationExpiryToCar(maXe);
		return result;
	}
}
