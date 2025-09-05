package com.ptit.csdlnc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ptit.csdlnc.dao.AssigmentDAO;
import com.ptit.csdlnc.dao.TripDAO;
import com.ptit.csdlnc.model.Assignment;
import com.ptit.csdlnc.model.Trip;
import com.ptit.csdlnc.model.response.AssigmentResponse;
import com.ptit.csdlnc.model.response.TripResponse;

@Service
public class TripService {
	@Autowired
	TripDAO tripDAO;

	@Autowired
	AssigmentDAO assigmentDAO;

	public Map<String, Object> getLstTrip(Map<String, Object> params) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		if (params.get("limit") != null && params.get("page") != null) {
			int limit = Integer.parseInt(params.get("limit").toString());
			int page = Integer.parseInt(params.get("page").toString());
			int offset = (page - 1) * limit;
			params.put("offset", offset);
			params.put("limit", limit);
		}

		List<TripResponse> result = tripDAO.getLstTrip(params);
		resultMap.put("data", result);
		resultMap.put("count", tripDAO.countLstTrip(params));
		return resultMap;
	}

	public int insertTrip(Trip model) throws Exception {
		int result = 0;
		try {
			result = tripDAO.insertTrip(model);
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

	public int updateTrip(Trip model) throws Exception {
		int result = 0;
		try {
			result = tripDAO.updateTrip(model);
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

	public int deleteTrip(String id) throws Exception {
		return tripDAO.deleteTrip(id);
	}

	@Transactional(rollbackFor = Exception.class)
	public int assignEmployeesToTrip(Assignment[] lstModel) throws Exception {
		int result = 0;
		try {
			if (lstModel.length == 0) {
				return result;
			}
			Map<String, Object> params = new HashMap<>();
			params.put("maChuyen", lstModel[0].getMaChuyen());
			params.put("maXe", lstModel[0].getMaXe());
			params.put("maTuyen", lstModel[0].getMaTuyen());
			assigmentDAO.deleteAssignmentToTrip(params);

			for (Assignment model : lstModel) {
				result = assigmentDAO.insertAssignment(model);
			}
		} catch (DuplicateKeyException e) {
			throw new RuntimeException("Trùng nhân viên!");
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

	public List<AssigmentResponse> getAssignEmployeesToTrip(Map<String, Object> model) throws Exception {
		return assigmentDAO.getAssignEmployeesToTrip(model);
	}
}
