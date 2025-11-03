package com.ptit.csdlnc.service;

import java.util.HashMap;
import java.util.LinkedHashMap;
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
import com.ptit.csdlnc.model.request.AssignmentRequest;
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

	public int deleteTrip(Map<String, Object> payload) throws Exception {
		return tripDAO.deleteTrip(payload);
	}

	@Transactional(rollbackFor = Exception.class)
	public int assignEmployeesToTrip(AssignmentRequest request) throws Exception {
		int result = 0;

		try {
			List<Assignment> addOrUpdate = request.getAddOrUpdate();
			List<Assignment> remove = request.getRemove();

			Assignment first = null;
			if (addOrUpdate != null && !addOrUpdate.isEmpty()) {
				first = addOrUpdate.get(0);
			} else if (remove != null && !remove.isEmpty()) {
				first = remove.get(0);
			}

			if (first != null) {
				Map<String, Object> params = new HashMap<>();
				params.put("maChuyen", first.getMaChuyen());
				params.put("maXe", first.getMaXe());
				params.put("maTuyen", first.getMaTuyen());

				assigmentDAO.deleteAssignmentToTrip(params);
			}

			if (addOrUpdate != null) {
				for (Assignment model : addOrUpdate) {
					result += assigmentDAO.insertAssignment(model);
				}
			}

		} catch (DuplicateKeyException e) {
			throw new RuntimeException("Trùng nhân viên!");
		} catch (UncategorizedSQLException e) {
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
