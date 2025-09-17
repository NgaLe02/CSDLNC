package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.TypeCarDAO;
import com.ptit.csdlnc.model.TypeCar;
import com.ptit.csdlnc.model.response.TypeCarResponse;

@Service
public class TypeCarService {
	@Autowired
	TypeCarDAO typeCarDAO;

	public List<TypeCarResponse> getLstTypeCar(Map<String, Object> params) throws Exception {
		List<TypeCarResponse> result = typeCarDAO.getLstTypeCar(params);
		return result;
	}

	public int insertTypeCar(TypeCar model) throws Exception {
		int result = 0;
		try {
			result = typeCarDAO.insertTypeCar(model);

		} catch (UncategorizedSQLException e) {
			// lỗi vi phạm trigger, foreign key, check constraint
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);
			} else {
				throw new RuntimeException("Lỗi dữ liệu không xác định!");
			}

		}
		return result;
	}

	public int updateTypeCar(TypeCar model) throws Exception {
		int result = 0;
		try {
			result = typeCarDAO.updateTypeCar(model);

		} catch (UncategorizedSQLException e) {
			// lỗi vi phạm trigger, foreign key, check constraint
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);
			} else {
				throw new RuntimeException("Lỗi dữ liệu không xác định!");
			}

		}
		return result;
	}

	public int deleteTypeCar(int id) throws Exception {
		return typeCarDAO.deleteTypeCar(id);
	}
}
