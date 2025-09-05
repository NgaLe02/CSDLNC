package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.AssigmentDAO;
import com.ptit.csdlnc.model.Assignment;
import com.ptit.csdlnc.model.response.AssigmentResponse;

@Service
public class AssigmentService {
	@Autowired
	AssigmentDAO assigmentDAO;

	public List<AssigmentResponse> getLstAssigment(Map<String, Object> params) throws Exception {
		List<AssigmentResponse> result = assigmentDAO.getLstAssigment(params);
		return result;
	}

	public int insertAssigment(Assignment model) throws Exception {
		int result = 0;
		try {
			result = assigmentDAO.insertAssignment(model);
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

	public int updateAssigment(Assignment model) throws Exception {
		int result = 0;
		try {
			result = assigmentDAO.updateAssignment(model);
		} catch (UncategorizedSQLException e) {
			// lỗi vi phạm trigger, foreign key, check constraint
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);

			} else {
				throw new RuntimeException("Lỗi dữ liệu không xác định!");
			}

		} catch (Exception e) {
			throw new RuntimeException("Lỗi hệ thống: " + e.getMessage());
		}
		return result;
	}

	public int deleteAssigment(String id) throws Exception {
		return assigmentDAO.deleteAssignment(id);
	}
}
